namespace telecom.Application.DTOs;

public record ContratoDto(
    Guid? Id,
    string NomeFilial,
    string PlanoContratado,
    DateTime DataInicio,
    DateTime DataVencimento,
    decimal ValorMensal,
    Guid OperadoraId
); 