using AutoMapper;
using MediatR;
using telecom.Application.DTOs;
using telecom.Application.Services.Contracts;
using telecom.Domain.Commands.ContratoCommands;
using telecom.Domain.Handlers.Contracts;
using telecom.Domain.Handlers.Response;
using telecom.Domain.UnitOfWork;

namespace telecom.Application.Services;

public class ContratoService : IContratoService
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public ContratoService(
        IMediator mediator, 
        IMapper mapper,
        IUnitOfWork unitOfWork)
    {
        _mediator = mediator;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<IHandleResult> CriarContratoAsync(ContratoDto contratoDto)
    {
        try
        {
            var command = _mapper.Map<CreateContratoCommand>(contratoDto);
            var result = await _mediator.Send(command);
            
            if (result.Sucess && result.Data != null)
            {
                var contratoResponse = _mapper.Map<ContratoDto>(result.Data);
                return new HandleResult(true, result.Message, contratoResponse);
            }
            
            return result;
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao criar contrato", ex.Message);
        }
    }

    public async Task<IHandleResult> AtualizarContratoAsync(ContratoDto contratoDto)
    {
        try
        {
            var command = _mapper.Map<UpdateContratoCommand>(contratoDto);
            var result = await _mediator.Send(command);
            
            if (result.Sucess && result.Data != null)
            {
                var contratoResponse = _mapper.Map<ContratoDto>(result.Data);
                return new HandleResult(true, result.Message, contratoResponse);
            }
            
            return result;
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao atualizar contrato", ex.Message);
        }
    }

    public async Task<IHandleResult> DeletarContratoAsync(Guid id)
    {
        try
        {

            var command = new DeleteContratoCommand(id);
            var result = await _mediator.Send(command);
            return result;
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao deletar contrato", ex.Message);
        }
    }

    public async Task<IHandleResult> ObterContratoPorIdAsync(Guid id)
    {
        try
        {
            var contrato = await _unitOfWork.Contratos.GetByIdAsync(id);
            if (contrato == null)
                return new HandleResult("Contrato não encontrado", "O contrato especificado não existe");

            var contratoResponse = _mapper.Map<ContratoDto>(contrato);
            return new HandleResult(true, "Contrato encontrado com sucesso", contratoResponse);
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao buscar contrato", ex.Message);
        }
    }

    public async Task<IHandleResult> ObterTodosContratosAsync()
    {
        try
        {
            var contratos = await _unitOfWork.Contratos.GetAllAsync();
            var contratosResponse = _mapper.Map<IEnumerable<ContratoDto>>(contratos);
            return new HandleResult(true, "Contratos obtidos com sucesso", contratosResponse);
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao buscar contratos", ex.Message);
        }
    }

    public async Task<IHandleResult> ObterContratosPorOperadoraAsync(Guid operadoraId)
    {
        try
        {
            var contratos = await _unitOfWork.Contratos.GetByOperadoraIdAsync(operadoraId);
            var contratosResponse = _mapper.Map<IEnumerable<ContratoDto>>(contratos);
            return new HandleResult(true, "Contratos da operadora obtidos com sucesso", contratosResponse);
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao buscar contratos da operadora", ex.Message);
        }
    }

    public async Task<IHandleResult> ObterContratosVencendoAsync(int vencimentoEm)
    {
        try
        {
            var contratos = await _unitOfWork.Contratos.GetContratosVencendoAsync(vencimentoEm);
            var contratosResponse = _mapper.Map<IEnumerable<ContratoDto>>(contratos);
            return new HandleResult(true, "Contratos vencendo obtidos com sucesso", contratosResponse);
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao buscar contratos vencendo", ex.Message);
        }
    }
} 