using telecom.Application.DTOs;
using telecom.Domain.Handlers.Contracts;

namespace telecom.Application.Services.Contracts;

public interface IFaturaService
{
    Task<IHandleResult> CriarFaturaAsync(FaturaDto faturaDto);
    Task<IHandleResult> AtualizarFaturaAsync(FaturaDto faturaDto);
    Task<IHandleResult> DeletarFaturaAsync(Guid id);
    Task<IHandleResult> ObterFaturaPorIdAsync(Guid id);
    Task<IHandleResult> ObterTodasFaturasAsync();
    Task<IHandleResult> ObterFaturasPorContratoAsync(Guid contratoId);
} 