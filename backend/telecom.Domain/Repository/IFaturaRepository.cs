using telecom.Domain.Entitys;

namespace telecom.Domain.Repository;

public interface IFaturaRepository
{
    Task<Guid> CreateAsync(Faturas fatura);
    Task<bool> UpdateAsync(Faturas fatura);
    Task<bool> DeleteAsync(Guid id);
    Task<Faturas?> GetByIdAsync(Guid id);
    Task<IEnumerable<Faturas>> GetAllAsync();
    Task<IEnumerable<Faturas>> GetByContratoIdAsync(Guid contratoId);
} 