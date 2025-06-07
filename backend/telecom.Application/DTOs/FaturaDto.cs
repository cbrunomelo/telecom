using telecom.Domain.Enuns;

namespace telecom.Application.DTOs;

public record FaturaDto(
    Guid? Id,
    decimal Valor,
    DateTime DataVencimento,
    Guid ContratoId,
    EFaturaStatus Status,
    DateTime? DateEmissao
); 