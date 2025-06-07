using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Commands.ContratoCommands;
using telecom.Domain.Entitys;
using telecom.Domain.Handlers.Contracts;
using telecom.Domain.Handlers.Response;
using telecom.Domain.UnitOfWork;
using telecom.Domain.Extensions;
using AutoMapper;
using MediatR;

namespace telecom.Domain.Handlers;

public class ContratoHandler : 
    IHandle<CreateContratoCommand>,
    IHandle<UpdateContratoCommand>,
    IHandle<DeleteContratoCommand>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public ContratoHandler(
        IUnitOfWork unitOfWork,
        IMediator mediator,
        IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mediator = mediator;
        _mapper = mapper;
    }

    public async Task<IHandleResult> Handle(CreateContratoCommand command, CancellationToken cancellationToken)
    {
        try
        {
            if (!command.IsValid())
                return new HandleResult("Não foi possível criar o contrato", command.ValidationErrors);

            var operadoraExists = await _unitOfWork.Operadoras.ExistsAsync(command.OperadoraId);
            if (!operadoraExists)
                return new HandleResult("Não foi possível criar o contrato", "Operadora não encontrada");

            var contrato = _mapper.Map<Contrato>(command);

            var contratoId = await _unitOfWork.Contratos.CreateAsync(contrato);
            if (contratoId == Guid.Empty)
                return new HandleResult("Não foi possível criar o contrato", "Erro interno");

            await _unitOfWork.CommitAsync();

            contrato.Id = contratoId;

            if (contrato.HasNotifications())
                await _mediator.PublishAll(contrato);

            return new HandleResult(true, "Contrato criado com sucesso", contrato);
        }
        catch (Exception ex)
        {
            _unitOfWork.Rollback();
            return new HandleResult("Erro interno ao criar contrato", ex.Message);
        }
    }

    public async Task<IHandleResult> Handle(UpdateContratoCommand command, CancellationToken cancellationToken)
    {
        try
        {
            if (!command.IsValid())
                return new HandleResult("Não foi possível atualizar o contrato", command.ValidationErrors);

            var contratoExistente = await _unitOfWork.Contratos.GetByIdAsync(command.Id);
            if (contratoExistente == null)
                return new HandleResult("Não foi possível atualizar o contrato", "Contrato não encontrado");

            contratoExistente.Atualizar(
                command.NomeFilial,
                command.PlanoContratado,
                command.DataInicio,
                command.DataVencimento,
                command.ValorMensal,
                command.OperadoraId
            );

            var success = await _unitOfWork.Contratos.UpdateAsync(contratoExistente);
            if (!success)
                return new HandleResult("Não foi possível atualizar o contrato", "Erro interno");

            await _unitOfWork.CommitAsync();

            if (contratoExistente.HasNotifications())
                await _mediator.PublishAll(contratoExistente);

            return new HandleResult(true, "Contrato atualizado com sucesso", contratoExistente);
        }
        catch (Exception ex)
        {
            _unitOfWork.Rollback();
            return new HandleResult("Erro interno ao atualizar contrato", ex.Message);
        }
    }

    public async Task<IHandleResult> Handle(DeleteContratoCommand command, CancellationToken cancellationToken)
    {
        try
        {
            if (!command.IsValid())
                return new HandleResult("Não foi possível deletar o contrato", command.ValidationErrors);

            var contrato = await _unitOfWork.Contratos.GetByIdAsync(command.Id);
            if (contrato == null)
                return new HandleResult("Não foi possível deletar o contrato", "Contrato não encontrado");

            var success = await _unitOfWork.Contratos.DeleteAsync(command.Id);
            if (!success)
                return new HandleResult("Não foi possível deletar o contrato", "Erro interno");

            await _unitOfWork.CommitAsync();

            return new HandleResult(true, "Contrato deletado com sucesso (incluindo todas as faturas vinculadas)", null);
        }
        catch (Exception ex)
        {
            _unitOfWork.Rollback();
            return new HandleResult("Erro interno ao deletar contrato", ex.Message);
        }
    }
}
