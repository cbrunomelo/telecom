using telecom.Domain.Enuns;

namespace telecom.Application.DTOs;

public record OperadoraDto(
    Guid? Id,
    string Nome,
    ETipoServicoOperadora ETipoServicoOperadora,
    string ContatoSuporte,
    int? TotalContratos
); 