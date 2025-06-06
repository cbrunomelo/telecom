using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Commands.FaturaCommands;
using telecom.Domain.Entitys;
using telecom.Domain.Handlers.Contracts;
using telecom.Domain.Handlers.Response;
using telecom.Domain.Repository;
using telecom.Domain.Extensions;
using telecom.Domain.UnitOfWork;
using AutoMapper;
using MediatR;

namespace telecom.Domain.Handlers;

public class FaturaHandler : 
    IHandle<CreateFaturaCommand>,
    IHandle<UpdateFaturaCommand>,
    IHandle<DeleteFaturaCommand>
{
    private readonly IFaturaRepository _faturaRepository;
    private readonly IContratoRepository _contratoRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public FaturaHandler(
        IFaturaRepository faturaRepository,
        IContratoRepository contratoRepository,
        IUnitOfWork unitOfWork,
        IMediator mediator,
        IMapper mapper)
    {
        _faturaRepository = faturaRepository;
        _contratoRepository = contratoRepository;
        _unitOfWork = unitOfWork;
        _mediator = mediator;
        _mapper = mapper;
    }

    public async Task<IHandleResult> Handle(CreateFaturaCommand command, CancellationToken cancellationToken)
    {
        // Validar o command
        if (!command.IsValid())
            return new HandleResult("Não foi possível criar a fatura", command.ValidationErrors);

        try
        {
            await _unitOfWork.BeginTransactionAsync(cancellationToken);

            // Verificar se o contrato existe
            var contratoExists = await _contratoRepository.ExistsAsync(command.ContratoId);
            if (!contratoExists)
                return new HandleResult("Não foi possível criar a fatura", "Contrato não encontrado");

            // Mapear command para entidade usando AutoMapper
            var fatura = _mapper.Map<Faturas>(command);

            var faturaId = await _faturaRepository.CreateAsync(fatura);
            if (faturaId == Guid.Empty)
                return new HandleResult("Não foi possível criar a fatura", "Erro interno");

            fatura.Id = faturaId;

            // Publicar eventos se a entidade suportar notificações
            if (fatura.HasNotifications())
                await _mediator.PublishAll(fatura);

            await _unitOfWork.CommitTransactionAsync(cancellationToken);
            return new HandleResult(true, "Fatura criada com sucesso", fatura);
        }
        catch (Exception)
        {
            await _unitOfWork.RollbackTransactionAsync(cancellationToken);
            return new HandleResult("Não foi possível criar a fatura", "Erro interno");
        }
    }

    public async Task<IHandleResult> Handle(UpdateFaturaCommand command, CancellationToken cancellationToken)
    {
        // Validar o command
        if (!command.IsValid())
            return new HandleResult("Não foi possível atualizar a fatura", command.ValidationErrors);

        try
        {
            await _unitOfWork.BeginTransactionAsync(cancellationToken);

            // Verificar se a fatura existe
            var faturaExistente = await _faturaRepository.GetByIdAsync(command.Id);
            if (faturaExistente == null)
                return new HandleResult("Não foi possível atualizar a fatura", "Fatura não encontrada");

            // Atualizar usando o método da entidade (preserva lógica de negócio)
            faturaExistente.Atualizar(command.DataVencimento, command.Valor);

            var success = await _faturaRepository.UpdateAsync(faturaExistente);
            if (!success)
                return new HandleResult("Não foi possível atualizar a fatura", "Erro interno");

            // Publicar eventos se a entidade suportar notificações
            if (faturaExistente.HasNotifications())
                await _mediator.PublishAll(faturaExistente);

            await _unitOfWork.CommitTransactionAsync(cancellationToken);
            return new HandleResult(true, "Fatura atualizada com sucesso", faturaExistente);
        }
        catch (Exception)
        {
            await _unitOfWork.RollbackTransactionAsync(cancellationToken);
            return new HandleResult("Não foi possível atualizar a fatura", "Erro interno");
        }
    }

    public async Task<IHandleResult> Handle(DeleteFaturaCommand command, CancellationToken cancellationToken)
    {
        // Validar o command
        if (!command.IsValid())
            return new HandleResult("Não foi possível deletar a fatura", command.ValidationErrors);

        try
        {
            await _unitOfWork.BeginTransactionAsync(cancellationToken);

            // Verificar se a fatura existe
            var fatura = await _faturaRepository.GetByIdAsync(command.Id);
            if (fatura == null)
                return new HandleResult("Não foi possível deletar a fatura", "Fatura não encontrada");

            var success = await _faturaRepository.DeleteAsync(command.Id);
            if (!success)
                return new HandleResult("Não foi possível deletar a fatura", "Erro interno");

            await _unitOfWork.CommitTransactionAsync(cancellationToken);
            return new HandleResult(true, "Fatura deletada com sucesso", null);
        }
        catch (Exception)
        {
            await _unitOfWork.RollbackTransactionAsync(cancellationToken);
            return new HandleResult("Não foi possível deletar a fatura", "Erro interno");
        }
    }
}
