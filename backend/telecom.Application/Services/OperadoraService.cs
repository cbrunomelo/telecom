using AutoMapper;
using MediatR;
using telecom.Application.DTOs;
using telecom.Application.Services.Contracts;
using telecom.Domain.Commands.OperadoraCommands;
using telecom.Domain.Handlers.Contracts;
using telecom.Domain.Handlers.Response;
using telecom.Domain.Repository;

namespace telecom.Application.Services;

public class OperadoraService : IOperadoraService
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    private readonly IOperadoraRepository _operadoraRepository;

    public OperadoraService(
        IMediator mediator, 
        IMapper mapper,
        IOperadoraRepository operadoraRepository)
    {
        _mediator = mediator;
        _mapper = mapper;
        _operadoraRepository = operadoraRepository;
    }

    public async Task<IHandleResult> CriarOperadoraAsync(OperadoraDto operadoraDto)
    {
        try
        {
            var command = _mapper.Map<CreateOperadoraCommand>(operadoraDto);
            var result = await _mediator.Send(command);
            
            if (result.Sucess && result.Data != null)
            {
                var operadoraResponse = _mapper.Map<OperadoraDto>(result.Data);
                return new HandleResult(true, result.Message, operadoraResponse);
            }
            
            return result;
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao criar operadora", ex.Message);
        }
    }

    public async Task<IHandleResult> AtualizarOperadoraAsync(OperadoraDto operadoraDto)
    {
        try
        {
            var command = _mapper.Map<UpdateOperadoraCommand>(operadoraDto);
            var result = await _mediator.Send(command);
            
            if (result.Sucess && result.Data != null)
            {
                var operadoraResponse = _mapper.Map<OperadoraDto>(result.Data);
                return new HandleResult(true, result.Message, operadoraResponse);
            }
            
            return result;
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao atualizar operadora", ex.Message);
        }
    }

    public async Task<IHandleResult> DeletarOperadoraAsync(Guid id)
    {
        try
        {
            var command = new DeleteOperadoraCommand(id);
            var result = await _mediator.Send(command);
            return result;
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao deletar operadora", ex.Message);
        }
    }

    public async Task<IHandleResult> ObterOperadoraPorIdAsync(Guid id)
    {
        try
        {
            var operadora = await _operadoraRepository.GetByIdAsync(id);
            if (operadora == null)
                return new HandleResult("Operadora não encontrada", "A operadora especificada não existe");

            var operadoraResponse = _mapper.Map<OperadoraDto>(operadora);
            return new HandleResult(true, "Operadora encontrada com sucesso", operadoraResponse);
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao buscar operadora", ex.Message);
        }
    }

    public async Task<IHandleResult> ObterTodasOperadorasAsync()
    {
        try
        {
            var operadoras = await _operadoraRepository.GetAllAsync();
            var operadorasResponse = _mapper.Map<IEnumerable<OperadoraDto>>(operadoras);
            return new HandleResult(true, "Operadoras obtidas com sucesso", operadorasResponse);
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao buscar operadoras", ex.Message);
        }
    }
} 