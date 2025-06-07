using AutoMapper;
using MediatR;
using telecom.Application.DTOs;
using telecom.Application.Services.Contracts;
using telecom.Domain.Commands.FaturaCommands;
using telecom.Domain.Handlers.Contracts;
using telecom.Domain.Handlers.Response;
using telecom.Domain.Repository;

namespace telecom.Application.Services;

public class FaturaService : IFaturaService
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    private readonly IFaturaRepository _faturaRepository;

    public FaturaService(
        IMediator mediator, 
        IMapper mapper,
        IFaturaRepository faturaRepository)
    {
        _mediator = mediator;
        _mapper = mapper;
        _faturaRepository = faturaRepository;
    }

    public async Task<IHandleResult> CriarFaturaAsync(FaturaDto faturaDto)
    {
        try
        {
            var command = _mapper.Map<CreateFaturaCommand>(faturaDto);
            var result = await _mediator.Send(command);
            
            if (result.Sucess && result.Data != null)
            {
                var faturaResponse = _mapper.Map<FaturaDto>(result.Data);
                return new HandleResult(true, result.Message, faturaResponse);
            }
            
            return result;
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao criar fatura", ex.Message);
        }
    }

    public async Task<IHandleResult> AtualizarFaturaAsync(FaturaDto faturaDto)
    {
        try
        {
            var command = _mapper.Map<UpdateFaturaCommand>(faturaDto);
            var result = await _mediator.Send(command);
            
            if (result.Sucess && result.Data != null)
            {
                var faturaResponse = _mapper.Map<FaturaDto>(result.Data);
                return new HandleResult(true, result.Message, faturaResponse);
            }
            
            return result;
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao atualizar fatura", ex.Message);
        }
    }

    public async Task<IHandleResult> DeletarFaturaAsync(Guid id)
    {
        try
        {
            var command = new DeleteFaturaCommand(id);
            var result = await _mediator.Send(command);
            return result;
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao deletar fatura", ex.Message);
        }
    }

    public async Task<IHandleResult> ObterFaturaPorIdAsync(Guid id)
    {
        try
        {
            var fatura = await _faturaRepository.GetByIdAsync(id);
            if (fatura == null)
                return new HandleResult("Fatura não encontrada", "A fatura especificada não existe");

            var faturaResponse = _mapper.Map<FaturaDto>(fatura);
            return new HandleResult(true, "Fatura encontrada com sucesso", faturaResponse);
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao buscar fatura", ex.Message);
        }
    }

    public async Task<IHandleResult> ObterTodasFaturasAsync()
    {
        try
        {
            var faturas = await _faturaRepository.GetAllAsync();
            var faturasResponse = _mapper.Map<IEnumerable<FaturaDto>>(faturas);
            return new HandleResult(true, "Faturas obtidas com sucesso", faturasResponse);
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao buscar faturas", ex.Message);
        }
    }

    public async Task<IHandleResult> ObterFaturasPorContratoAsync(Guid contratoId)
    {
        try
        {
            var faturas = await _faturaRepository.GetByContratoIdAsync(contratoId);
            var faturasResponse = _mapper.Map<IEnumerable<FaturaDto>>(faturas);
            return new HandleResult(true, "Faturas do contrato obtidas com sucesso", faturasResponse);
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao buscar faturas do contrato", ex.Message);
        }
    }
} 