using Microsoft.EntityFrameworkCore;
using telecom.Domain.Entitys;
using telecom.Infra.Data;

namespace telecom.Infra.Repository;

public class RepositoryBase<T> where T : EntityBase
{
    private readonly TelecomDbContext _context;
    private readonly DbSet<T> _dbSet;

    public RepositoryBase(TelecomDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<Guid> CreateAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        return entity.Id;
    }

    public async Task<bool> UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        return await Task.FromResult(true);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _dbSet.FindAsync(id);
        if (entity == null)
            return false;

        _dbSet.Remove(entity);
        return true;
    }

    public async Task<T?> GetByIdAsync(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _dbSet.AnyAsync(e => e.Id == id);
    }

    public IQueryable<T> Query()
    {
        return _dbSet.AsQueryable();
    }

    public async Task<IEnumerable<T>> FindAsync(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.Where(predicate).ToListAsync();
    }

    public async Task<T?> FirstOrDefaultAsync(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.FirstOrDefaultAsync(predicate);
    }

    public async Task<int> CountAsync()
    {
        return await _dbSet.CountAsync();
    }

    public async Task<int> CountAsync(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.CountAsync(predicate);
    }
} 