using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using telecom.Infra.Data;
using telecom.Infra.Seed;

namespace telecom.Application.Extensions;

public static class DatabaseExtensions
{
    public static async Task ApplyMigrationsAsync(this IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TelecomDbContext>();
        
        const int maxRetries = 10;
        const int delayBetweenRetries = 3000;
        
        for (int i = 0; i < maxRetries; i++)
        {
            try
            {                
                await context.Database.CanConnectAsync();                                            
                var pendingMigrations = await context.Database.GetPendingMigrationsAsync();
                
                if (pendingMigrations.Any())
                {
                    await context.Database.MigrateAsync();
                }

                await DatabaseSeeder.SeedAsync(serviceProvider);
                
                return;
            }
            catch (Exception ex)
            {
                
                if (i == maxRetries - 1)
                {      
                    throw new InvalidOperationException("Não foi possível conectar ao banco de dados após múltiplas tentativas.", ex);
                }                
                await Task.Delay(delayBetweenRetries);
            }
        }
    }


} 