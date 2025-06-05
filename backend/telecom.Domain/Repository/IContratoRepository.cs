using telecom.Domain.Entitys;

namespace telecom.Domain.Repository;

public interface IContratoRepository
{
    Task<Guid> CreateAsync(Contrato contrato);
    Task<bool> UpdateAsync(Contrato contrato);
    Task<bool> DeleteAsync(Guid id);
    Task<Contrato?> GetByIdAsync(Guid id);
    Task<IEnumerable<Contrato>> GetAllAsync();
    Task<IEnumerable<Contrato>> GetByOperadoraIdAsync(Guid operadoraId);
    Task<bool> ExistsAsync(Guid id);
} 