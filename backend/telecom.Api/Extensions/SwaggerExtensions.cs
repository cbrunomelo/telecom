using Microsoft.OpenApi.Models;
using System.Reflection;

namespace telecom.Api.Extensions;

public static class SwaggerExtensions
{
    public static IServiceCollection AddSwaggerConfiguration(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Telecom API",
                Version = "v1",
                Description = "API para gerenciamento de telecomunicações - Operadoras, Contratos e Faturas",
                Contact = new OpenApiContact
                {
                    Name = "Equipe de Desenvolvimento",
                    Email = "dev@telecom.com"
                }
            });

            // Incluir comentários XML na documentação
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            if (File.Exists(xmlPath))
            {
                c.IncludeXmlComments(xmlPath);
            }

            // Configurar esquemas para melhor visualização
            c.EnableAnnotations();
            c.DescribeAllParametersInCamelCase();
        });

        return services;
    }
} 