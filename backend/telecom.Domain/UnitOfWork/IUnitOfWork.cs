using telecom.Domain.Repository;

namespace telecom.Domain.UnitOfWork;

public interface IUnitOfWork : IDisposable
{
    IFaturaRepository Faturas { get; }
    IContratoRepository Contratos { get; }
    IOperadoraRepository Operadoras { get; }

    Task<int> CommitAsync();
    void Rollback();
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    Task BeginTransactionAsync(CancellationToken cancellationToken = default);
    Task CommitTransactionAsync(CancellationToken cancellationToken = default);
    Task RollbackTransactionAsync(CancellationToken cancellationToken = default);
} 