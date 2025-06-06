using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Commands.ContratoCommands;
using telecom.Domain.Entitys;
using telecom.Domain.Handlers.Contracts;
using telecom.Domain.Handlers.Response;
using telecom.Domain.Repository;
using telecom.Domain.Extensions;
using AutoMapper;
using MediatR;

namespace telecom.Domain.Handlers;

public class ContratoHandler : 
    IHandle<CreateContratoCommand>,
    IHandle<UpdateContratoCommand>,
    IHandle<DeleteContratoCommand>
{
    private readonly IContratoRepository _contratoRepository;
    private readonly IOperadoraRepository _operadoraRepository;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public ContratoHandler(
        IContratoRepository contratoRepository,
        IOperadoraRepository operadoraRepository,
        IMediator mediator,
        IMapper mapper)
    {
        _contratoRepository = contratoRepository;
        _operadoraRepository = operadoraRepository;
        _mediator = mediator;
        _mapper = mapper;
    }

    public async Task<IHandleResult> Handle(CreateContratoCommand command, CancellationToken cancellationToken)
    {
        if (!command.IsValid())
            return new HandleResult("Não foi possível criar o contrato", command.ValidationErrors);

        var operadoraExists = await _operadoraRepository.ExistsAsync(command.OperadoraId);
        if (!operadoraExists)
            return new HandleResult("Não foi possível criar o contrato", "Operadora não encontrada");

        var contrato = _mapper.Map<Contrato>(command);

        var contratoId = await _contratoRepository.CreateAsync(contrato);
        if (contratoId == Guid.Empty)
            return new HandleResult("Não foi possível criar o contrato", "Erro interno");

        contrato.Id = contratoId;

        if (contrato.HasNotifications())
            await _mediator.PublishAll(contrato);

        return new HandleResult(true, "Contrato criado com sucesso", contrato);
    }

    public async Task<IHandleResult> Handle(UpdateContratoCommand command, CancellationToken cancellationToken)
    {
        if (!command.IsValid())
            return new HandleResult("Não foi possível atualizar o contrato", command.ValidationErrors);

        var contratoExistente = await _contratoRepository.GetByIdAsync(command.Id);
        if (contratoExistente == null)
            return new HandleResult("Não foi possível atualizar o contrato", "Contrato não encontrado");

        contratoExistente.Atualizar(
            command.NomeFilial,
            command.PlanoContratado,
            command.DataInicio,
            command.DataVencimento,
            command.ValorMensal
        );

        var success = await _contratoRepository.UpdateAsync(contratoExistente);
        if (!success)
            return new HandleResult("Não foi possível atualizar o contrato", "Erro interno");

        if (contratoExistente.HasNotifications())
            await _mediator.PublishAll(contratoExistente);

        return new HandleResult(true, "Contrato atualizado com sucesso", contratoExistente);
    }

    public async Task<IHandleResult> Handle(DeleteContratoCommand command, CancellationToken cancellationToken)
    {
        if (!command.IsValid())
            return new HandleResult("Não foi possível deletar o contrato", command.ValidationErrors);

        var contrato = await _contratoRepository.GetByIdAsync(command.Id);
        if (contrato == null)
            return new HandleResult("Não foi possível deletar o contrato", "Contrato não encontrado");

        var success = await _contratoRepository.DeleteAsync(command.Id);
        if (!success)
            return new HandleResult("Não foi possível deletar o contrato", "Erro interno");

        return new HandleResult(true, "Contrato deletado com sucesso", null);
    }
}
