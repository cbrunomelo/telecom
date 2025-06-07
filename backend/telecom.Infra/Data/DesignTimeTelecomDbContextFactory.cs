using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace telecom.Infra.Data;

internal class DesignTimeTelecomDbContextFactory : IDesignTimeDbContextFactory<TelecomDbContext>
{
    public TelecomDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<TelecomDbContext>();

        var connectionString = ConnectionStrings.Development;

        optionsBuilder.UseNpgsql(connectionString);

        return new TelecomDbContext(optionsBuilder.Options);
    }
} 