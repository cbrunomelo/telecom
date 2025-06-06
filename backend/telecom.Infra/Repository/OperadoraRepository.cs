using Microsoft.EntityFrameworkCore;
using telecom.Domain.Entitys;
using telecom.Domain.Repository;
using telecom.Infra.Data;

namespace telecom.Infra.Repository;

public class OperadoraRepository : IOperadoraRepository
{
    private readonly RepositoryBase<Operadora> _baseRepository;
    private readonly TelecomDbContext _context;

    public OperadoraRepository(TelecomDbContext context)
    {
        _context = context;
        _baseRepository = new RepositoryBase<Operadora>(context);
    }

    public async Task<Guid> CreateAsync(Operadora operadora)
    {
        return await _baseRepository.CreateAsync(operadora);
    }

    public async Task<bool> UpdateAsync(Operadora operadora)
    {
        return await _baseRepository.UpdateAsync(operadora);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _baseRepository.DeleteAsync(id);
    }

    public async Task<Operadora?> GetByIdAsync(Guid id)
    {
        return await _baseRepository.Query()
            .Include(o => o.Contratos)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task<IEnumerable<Operadora>> GetAllAsync()
    {
        return await _baseRepository.Query()
            .Include(o => o.Contratos)
            .OrderBy(o => o.Nome)
            .ToListAsync();
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _baseRepository.ExistsAsync(id);
    }

    public async Task<bool> HasContratosAsync(Guid id)
    {
        return await _context.Contratos
            .AnyAsync(c => c.OperadoraId == id);
    }
} 