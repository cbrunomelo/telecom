using telecom.Application.DTOs;
using telecom.Domain.Handlers.Contracts;

namespace telecom.Application.Services.Contracts;

/// <summary>
/// Service para demonstrar o uso do UnitOfWork em operações transacionais
/// </summary>
public interface IExemploTransacaoService
{
    /// <summary>
    /// Exemplo: Criar uma operadora e um contrato numa mesma transação
    /// </summary>
    Task<IHandleResult> CriarOperadoraComContratoAsync(OperadoraDto operadoraDto, ContratoDto contratoDto);
    
    /// <summary>
    /// Exemplo: Transferir contratos de uma operadora para outra
    /// </summary>
    Task<IHandleResult> TransferirContratosAsync(Guid operadoraOrigemId, Guid operadoraDestinoId);
    
    /// <summary>
    /// Exemplo: Criar múltiplas faturas para um contrato
    /// </summary>
    Task<IHandleResult> CriarFaturasEmLoteAsync(Guid contratoId, List<FaturaDto> faturas);
} 