using Microsoft.EntityFrameworkCore;
using telecom.Domain.Entitys;

namespace telecom.Infra.Data;

public class TelecomDbContext : DbContext
{
    public TelecomDbContext(DbContextOptions<TelecomDbContext> options) : base(options)
    {
    }

    public DbSet<Operadora> Operadoras { get; set; }
    public DbSet<Contrato> Contratos { get; set; }
    public DbSet<Faturas> Faturas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TelecomDbContext).Assembly);
    }
} 