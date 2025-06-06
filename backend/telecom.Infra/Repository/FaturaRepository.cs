using Microsoft.EntityFrameworkCore;
using telecom.Domain.Entitys;
using telecom.Domain.Repository;
using telecom.Infra.Data;

namespace telecom.Infra.Repository;

public class FaturaRepository : IFaturaRepository
{
    private readonly RepositoryBase<Faturas> _baseRepository;
    private readonly TelecomDbContext _context;

    public FaturaRepository(TelecomDbContext context)
    {
        _context = context;
        _baseRepository = new RepositoryBase<Faturas>(context);
    }

    public async Task<Guid> CreateAsync(Faturas fatura)
    {
        return await _baseRepository.CreateAsync(fatura);
    }

    public async Task<bool> UpdateAsync(Faturas fatura)
    {
        return await _baseRepository.UpdateAsync(fatura);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _baseRepository.DeleteAsync(id);
    }

    public async Task<Faturas?> GetByIdAsync(Guid id)
    {
        return await _baseRepository.Query()
            .Include(f => f.Contrato)
            .ThenInclude(c => c.Operadora)
            .FirstOrDefaultAsync(f => f.Id == id);
    }

    public async Task<IEnumerable<Faturas>> GetAllAsync()
    {
        return await _baseRepository.Query()
            .Include(f => f.Contrato)
            .ThenInclude(c => c.Operadora)
            .ToListAsync();
    }

    public async Task<IEnumerable<Faturas>> GetByContratoIdAsync(Guid contratoId)
    {
        return await _baseRepository.Query()
            .Include(f => f.Contrato)
            .Where(f => f.ContratoId == contratoId)
            .OrderByDescending(f => f.DataVencimento)
            .ToListAsync();
    }
} 