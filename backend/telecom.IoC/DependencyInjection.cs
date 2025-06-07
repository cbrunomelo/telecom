using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using telecom.Application.Mappings;
using telecom.Application.Services;
using telecom.Application.Services.Contracts;
using telecom.Domain.Mappings;
using telecom.Infra.Data;

namespace telecom.IoC;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // Configuração do Entity Framework
        var connectionString = configuration.GetConnectionString("DefaultConnection") 
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        services.AddDbContext<TelecomDbContext>(options =>
            options.UseNpgsql(connectionString));

        return services;
    }

    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Registrar serviços da Application
        services.AddScoped<IFaturaService, FaturaService>();
        services.AddScoped<IContratoService, ContratoService>();
        services.AddScoped<IOperadoraService, OperadoraService>();

        services.AddAutoMapper(
            typeof(FaturaProfile).Assembly,        
            typeof(ContratoProfile).Assembly,      
            typeof(OperadoraProfile).Assembly,     
            typeof(ApplicationMappingProfile).Assembly  
        );
        
        return services;
    }
} 