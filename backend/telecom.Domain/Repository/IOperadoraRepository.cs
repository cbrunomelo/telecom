using telecom.Domain.Entitys;

namespace telecom.Domain.Repository;

public interface IOperadoraRepository
{
    Task<Guid> CreateAsync(Operadora operadora);
    Task<bool> UpdateAsync(Operadora operadora);
    Task<bool> DeleteAsync(Guid id);
    Task<Operadora?> GetByIdAsync(Guid id);
    Task<IEnumerable<Operadora>> GetAllAsync();
    Task<bool> ExistsAsync(Guid id);
    Task<bool> HasContratosAsync(Guid id);
} 