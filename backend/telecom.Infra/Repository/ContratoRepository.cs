using Microsoft.EntityFrameworkCore;
using telecom.Domain.Entitys;
using telecom.Domain.Repository;
using telecom.Infra.Data;

namespace telecom.Infra.Repository;

public class ContratoRepository : IContratoRepository
{
    private readonly RepositoryBase<Contrato> _baseRepository;
    private readonly TelecomDbContext _context;

    public ContratoRepository(TelecomDbContext context)
    {
        _context = context;
        _baseRepository = new RepositoryBase<Contrato>(context);
    }

    public async Task<Guid> CreateAsync(Contrato contrato)
    {
        return await _baseRepository.CreateAsync(contrato);
    }

    public async Task<bool> UpdateAsync(Contrato contrato)
    {
        return await _baseRepository.UpdateAsync(contrato);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _baseRepository.DeleteAsync(id);
    }

    public async Task<Contrato?> GetByIdAsync(Guid id)
    {
        return await _baseRepository.Query()
            .Include(c => c.Operadora)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<Contrato>> GetAllAsync()
    {
        return await _baseRepository.Query()
            .Include(c => c.Operadora)
            .OrderBy(c => c.NomeFilial)
            .ToListAsync();
    }

    public async Task<IEnumerable<Contrato>> GetByOperadoraIdAsync(Guid operadoraId)
    {
        return await _baseRepository.Query()
            .Include(c => c.Operadora)
            .Where(c => c.OperadoraId == operadoraId)
            .OrderBy(c => c.NomeFilial)
            .ToListAsync();
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _baseRepository.ExistsAsync(id);
    }
} 