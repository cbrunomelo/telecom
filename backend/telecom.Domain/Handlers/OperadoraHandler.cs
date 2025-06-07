using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Commands.OperadoraCommands;
using telecom.Domain.Entitys;
using telecom.Domain.Handlers.Contracts;
using telecom.Domain.Handlers.Response;
using telecom.Domain.UnitOfWork;
using telecom.Domain.Extensions;
using AutoMapper;
using MediatR;

namespace telecom.Domain.Handlers;

public class OperadoraHandler : 
    IHandle<CreateOperadoraCommand>,
    IHandle<UpdateOperadoraCommand>,
    IHandle<DeleteOperadoraCommand>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public OperadoraHandler(
        IUnitOfWork unitOfWork,
        IMediator mediator,
        IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mediator = mediator;
        _mapper = mapper;
    }

    public async Task<IHandleResult> Handle(CreateOperadoraCommand command, CancellationToken cancellationToken)
    {
        try
        {
            if (!command.IsValid())
                return new HandleResult("Não foi possível criar a operadora", command.ValidationErrors);

            var operadora = _mapper.Map<Operadora>(command);

            var operadoraId = await _unitOfWork.Operadoras.CreateAsync(operadora);
            if (operadoraId == Guid.Empty)
                return new HandleResult("Não foi possível criar a operadora", "Erro interno");

            await _unitOfWork.CommitAsync();

            operadora.Id = operadoraId;

            if (operadora.HasNotifications())
                await _mediator.PublishAll(operadora);

            return new HandleResult(true, "Operadora criada com sucesso", operadora);
        }
        catch (Exception ex)
        {
            _unitOfWork.Rollback();
            return new HandleResult("Erro interno ao criar operadora", ex.Message);
        }
    }

    public async Task<IHandleResult> Handle(UpdateOperadoraCommand command, CancellationToken cancellationToken)
    {
        try
        {
            if (!command.IsValid())
                return new HandleResult("Não foi possível atualizar a operadora", command.ValidationErrors);

            var operadoraExistente = await _unitOfWork.Operadoras.GetByIdAsync(command.Id);
            if (operadoraExistente == null)
                return new HandleResult("Não foi possível atualizar a operadora", "Operadora não encontrada");

            operadoraExistente.Atualizar(
                command.Nome,
                command.ETipoServicoOperadora,
                command.ContatoSuporte
            );

            var success = await _unitOfWork.Operadoras.UpdateAsync(operadoraExistente);
            if (!success)
                return new HandleResult("Não foi possível atualizar a operadora", "Erro interno");

            await _unitOfWork.CommitAsync();

            if (operadoraExistente.HasNotifications())
                await _mediator.PublishAll(operadoraExistente);

            return new HandleResult(true, "Operadora atualizada com sucesso", operadoraExistente);
        }
        catch (Exception ex)
        {
            _unitOfWork.Rollback();
            return new HandleResult("Erro interno ao atualizar operadora", ex.Message);
        }
    }

    public async Task<IHandleResult> Handle(DeleteOperadoraCommand command, CancellationToken cancellationToken)
    {
        try
        {
            if (!command.IsValid())
                return new HandleResult("Não foi possível deletar a operadora", command.ValidationErrors);

            var operadora = await _unitOfWork.Operadoras.GetByIdAsync(command.Id);
            if (operadora == null)
                return new HandleResult("Não foi possível deletar a operadora", "Operadora não encontrada");

            var success = await _unitOfWork.Operadoras.DeleteAsync(command.Id);
            if (!success)
                return new HandleResult("Não foi possível deletar a operadora", "Erro interno");

            await _unitOfWork.CommitAsync();

            return new HandleResult(true, "Operadora deletada com sucesso (incluindo todos os contratos e faturas vinculados)", null);
        }
        catch (Exception ex)
        {
            _unitOfWork.Rollback();
            return new HandleResult("Erro interno ao deletar operadora", ex.Message);
        }
    }
}
