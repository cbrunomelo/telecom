using Microsoft.EntityFrameworkCore.Storage;
using telecom.Domain.Repository;
using telecom.Domain.UnitOfWork;
using telecom.Infra.Data;

namespace telecom.Infra.UnitOfWork;

public class UnitOfWork : IUnitOfWork
{
    private readonly TelecomDbContext _context;
    private IDbContextTransaction? _transaction;
    private bool _disposed = false;

    public UnitOfWork(
        IFaturaRepository faturaRepository,
        IContratoRepository contratoRepository,
        IOperadoraRepository operadoraRepository,
        TelecomDbContext context)
    {
        Faturas = faturaRepository;
        Contratos = contratoRepository;
        Operadoras = operadoraRepository;
        _context = context;
    }

    public IFaturaRepository Faturas { get; }
    public IContratoRepository Contratos { get; }
    public IOperadoraRepository Operadoras { get; }

    public async Task<int> CommitAsync()
        => await _context.SaveChangesAsync();

    public void Rollback()
        => _context.ChangeTracker.Clear();

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task BeginTransactionAsync(CancellationToken cancellationToken = default)
    {
        if (_transaction != null)
            throw new InvalidOperationException("Uma transação já está em andamento");

        _transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
    }

    public async Task CommitTransactionAsync(CancellationToken cancellationToken = default)
    {
        if (_transaction == null)
            throw new InvalidOperationException("Nenhuma transação foi iniciada");

        try
        {
            await SaveChangesAsync(cancellationToken);
            await _transaction.CommitAsync(cancellationToken);
        }
        catch
        {
            await RollbackTransactionAsync(cancellationToken);
            throw;
        }
        finally
        {
            await _transaction.DisposeAsync();
            _transaction = null;
        }
    }

    public async Task RollbackTransactionAsync(CancellationToken cancellationToken = default)
    {
        if (_transaction == null)
            return;

        try
        {
            await _transaction.RollbackAsync(cancellationToken);
        }
        finally
        {
            await _transaction.DisposeAsync();
            _transaction = null;
        }
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed && disposing)
        {
            _transaction?.Dispose();
            _context?.Dispose();
            _disposed = true;
        }
    }
} 