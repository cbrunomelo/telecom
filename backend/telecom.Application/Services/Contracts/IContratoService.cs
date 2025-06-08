using telecom.Application.DTOs;
using telecom.Domain.Handlers.Contracts;

namespace telecom.Application.Services.Contracts;

public interface IContratoService
{
    Task<IHandleResult> CriarContratoAsync(ContratoDto contratoDto);
    Task<IHandleResult> AtualizarContratoAsync(ContratoDto contratoDto);
    Task<IHandleResult> DeletarContratoAsync(Guid id);
    Task<IHandleResult> ObterContratoPorIdAsync(Guid id);
    Task<IHandleResult> ObterTodosContratosAsync();
    Task<IHandleResult> ObterContratosPorOperadoraAsync(Guid operadoraId);
    Task<IHandleResult> ObterContratosVencendoAsync(int vencimentoEm);
} 