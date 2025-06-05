using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Commands.OperadoraCommands;
using telecom.Domain.Entitys;
using telecom.Domain.Handlers.Contracts;
using telecom.Domain.Handlers.Response;
using telecom.Domain.Repository;
using telecom.Domain.Extensions;
using AutoMapper;
using MediatR;

namespace telecom.Domain.Handlers;

public class OperadoraHandler : 
    IHandle<CreateOperadoraCommand>,
    IHandle<UpdateOperadoraCommand>,
    IHandle<DeleteOperadoraCommand>
{
    private readonly IOperadoraRepository _operadoraRepository;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public OperadoraHandler(
        IOperadoraRepository operadoraRepository,
        IMediator mediator,
        IMapper mapper)
    {
        _operadoraRepository = operadoraRepository;
        _mediator = mediator;
        _mapper = mapper;
    }

    public async Task<IHandleResult> Handle(CreateOperadoraCommand command, CancellationToken cancellationToken)
    {
        // Validar o command
        if (!command.IsValid())
            return new HandleResult("Não foi possível criar a operadora", command.ValidationErrors);

        // Mapear command para entidade usando AutoMapper
        var operadora = _mapper.Map<Operadora>(command);

        var operadoraId = await _operadoraRepository.CreateAsync(operadora);
        if (operadoraId == Guid.Empty)
            return new HandleResult("Não foi possível criar a operadora", "Erro interno");

        operadora.Id = operadoraId;

        // Publicar eventos se a entidade suportar notificações
        if (operadora.HasNotifications())
            await _mediator.PublishAll(operadora);

        return new HandleResult(true, "Operadora criada com sucesso", operadora);
    }

    public async Task<IHandleResult> Handle(UpdateOperadoraCommand command, CancellationToken cancellationToken)
    {
        // Validar o command
        if (!command.IsValid())
            return new HandleResult("Não foi possível atualizar a operadora", command.ValidationErrors);

        // Verificar se a operadora existe
        var operadoraExistente = await _operadoraRepository.GetByIdAsync(command.Id);
        if (operadoraExistente == null)
            return new HandleResult("Não foi possível atualizar a operadora", "Operadora não encontrada");

        // Atualizar usando o método da entidade (preserva lógica de negócio)
        operadoraExistente.Atualizar(
            command.Nome,
            command.ETipoServicoOperadora,
            command.ContatoSuporte
        );

        var success = await _operadoraRepository.UpdateAsync(operadoraExistente);
        if (!success)
            return new HandleResult("Não foi possível atualizar a operadora", "Erro interno");

        // Publicar eventos se a entidade suportar notificações
        if (operadoraExistente.HasNotifications())
            await _mediator.PublishAll(operadoraExistente);

        return new HandleResult(true, "Operadora atualizada com sucesso", operadoraExistente);
    }

    public async Task<IHandleResult> Handle(DeleteOperadoraCommand command, CancellationToken cancellationToken)
    {
        // Validar o command
        if (!command.IsValid())
            return new HandleResult("Não foi possível deletar a operadora", command.ValidationErrors);

        // Verificar se a operadora existe
        var operadora = await _operadoraRepository.GetByIdAsync(command.Id);
        if (operadora == null)
            return new HandleResult("Não foi possível deletar a operadora", "Operadora não encontrada");

        // Verificar se a operadora possui contratos ativos (regra de negócio)
        var hasContratos = await _operadoraRepository.HasContratosAsync(command.Id);
        if (hasContratos)
            return new HandleResult("Não foi possível deletar a operadora", "Operadora possui contratos ativos");

        var success = await _operadoraRepository.DeleteAsync(command.Id);
        if (!success)
            return new HandleResult("Não foi possível deletar a operadora", "Erro interno");

        return new HandleResult(true, "Operadora deletada com sucesso", null);
    }
}
