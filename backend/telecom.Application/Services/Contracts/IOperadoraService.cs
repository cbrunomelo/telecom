using telecom.Application.DTOs;
using telecom.Domain.Handlers.Contracts;

namespace telecom.Application.Services.Contracts;

public interface IOperadoraService
{
    Task<IHandleResult> CriarOperadoraAsync(OperadoraDto operadoraDto);
    Task<IHandleResult> AtualizarOperadoraAsync(OperadoraDto operadoraDto);
    Task<IHandleResult> DeletarOperadoraAsync(Guid id);
    Task<IHandleResult> ObterOperadoraPorIdAsync(Guid id);
    Task<IHandleResult> ObterTodasOperadorasAsync();
} 