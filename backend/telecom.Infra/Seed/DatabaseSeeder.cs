using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using telecom.Domain.Entitys;
using telecom.Domain.Enuns;
using telecom.Infra.Data;

namespace telecom.Infra.Seed;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TelecomDbContext>();

        try
        {
            var vivo = new Operadora("Vivo", ETipoServicoOperadora.Movel, "1058");
            await context.Operadoras.AddAsync(vivo);
            await context.SaveChangesAsync();

            var contratoVivo1 = new Contrato("Matriz São Paulo", "Plano Básico 2GB", 
                DateTime.UtcNow.AddMonths(-15), DateTime.UtcNow.AddMonths(12), 89.90m, vivo.Id);
            
            var contratoVivo2 = new Contrato("Filial Rio de Janeiro", "Plano Premium 10GB", 
                DateTime.UtcNow.AddMonths(-15), DateTime.UtcNow.AddMonths(12), 149.90m, vivo.Id);
            
            var contratoVivo3 = new Contrato("Filial Brasília", "Plano Empresarial 20GB", 
                DateTime.UtcNow.AddMonths(-15), DateTime.UtcNow.AddMonths(12), 199.90m, vivo.Id);

            await context.Contratos.AddRangeAsync(contratoVivo1, contratoVivo2, contratoVivo3);
            await context.SaveChangesAsync();

            var faturasVivo = CriarFaturasMensais(contratoVivo1, 89.90m, "Vivo1")
                .Concat(CriarFaturasMensais(contratoVivo2, 149.90m, "Vivo2"))
                .Concat(CriarFaturasMensais(contratoVivo3, 199.90m, "Vivo3"))
                .ToList();

            await context.Faturas.AddRangeAsync(faturasVivo);
            await context.SaveChangesAsync();

            var claro = new Operadora("Claro Fibra", ETipoServicoOperadora.Internet, "106");
            await context.Operadoras.AddAsync(claro);
            await context.SaveChangesAsync();

            var contratoClaro1 = new Contrato("Filial Belo Horizonte", "Internet 200MB", 
                DateTime.UtcNow.AddMonths(-15), DateTime.UtcNow.AddMonths(12), 99.90m, claro.Id);
            
            var contratoClaro2 = new Contrato("Filial Porto Alegre", "Internet 500MB", 
                DateTime.UtcNow.AddMonths(-15), DateTime.UtcNow.AddMonths(12), 149.90m, claro.Id);

            await context.Contratos.AddRangeAsync(contratoClaro1, contratoClaro2);
            await context.SaveChangesAsync();

            var faturasClaro = CriarFaturasMensais(contratoClaro1, 99.90m, "Claro1")
                .Concat(CriarFaturasMensais(contratoClaro2, 149.90m, "Claro2"))
                .ToList();

            await context.Faturas.AddRangeAsync(faturasClaro);
            await context.SaveChangesAsync();

            var tim = new Operadora("TIM", ETipoServicoOperadora.Movel, "1056");
            await context.Operadoras.AddAsync(tim);
            await context.SaveChangesAsync();

            var contratoTim1 = new Contrato("Filial Curitiba", "TIM Controle 4GB", 
                DateTime.UtcNow.AddMonths(-15), DateTime.UtcNow.AddMonths(12), 79.90m, tim.Id);
            
            var contratoTim2 = new Contrato("Filial Fortaleza", "TIM Pós 15GB", 
                DateTime.UtcNow.AddMonths(-15), DateTime.UtcNow.AddMonths(12), 129.90m, tim.Id);

            var contratoTim3 = new Contrato("Filial Salvador", "TIM Black", 
                DateTime.UtcNow.AddMonths(-15), DateTime.UtcNow.AddMonths(12), 189.90m, tim.Id);

            await context.Contratos.AddRangeAsync(contratoTim1, contratoTim2, contratoTim3);
            await context.SaveChangesAsync();

            var faturasTim = CriarFaturasMensais(contratoTim1, 79.90m, "Tim1")
                .Concat(CriarFaturasMensais(contratoTim2, 129.90m, "Tim2"))
                .Concat(CriarFaturasMensais(contratoTim3, 189.90m, "Tim3"))
                .ToList();

            await context.Faturas.AddRangeAsync(faturasTim);
            await context.SaveChangesAsync();

            var oi = new Operadora("Oi Fixo", ETipoServicoOperadora.Fixo, "103");
            await context.Operadoras.AddAsync(oi);
            await context.SaveChangesAsync();

            var contratoOi1 = new Contrato("Filial Manaus", "Linha Residencial", 
                DateTime.UtcNow.AddMonths(-15), DateTime.UtcNow.AddMonths(12), 49.90m, oi.Id);

            var contratoOi2 = new Contrato("Filial Recife", "Linha Comercial", 
                DateTime.UtcNow.AddMonths(-15), DateTime.UtcNow.AddMonths(12), 89.90m, oi.Id);

            await context.Contratos.AddRangeAsync(contratoOi1, contratoOi2);
            await context.SaveChangesAsync();

            var faturasOi = CriarFaturasMensais(contratoOi1, 49.90m, "Oi1")
                .Concat(CriarFaturasMensais(contratoOi2, 89.90m, "Oi2"))
                .ToList();

            await context.Faturas.AddRangeAsync(faturasOi);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    private static List<Faturas> CriarFaturasMensais(Contrato contrato, decimal valorBase, string prefixo)
    {
        var faturas = new List<Faturas>();
        var hoje = DateTime.UtcNow;
        var random = new Random(contrato.Id.GetHashCode());

        for (int i = 11; i >= 0; i--)
        {
            var mesVencimento = hoje.AddMonths(-i);
            var diaVencimento = 10;
            
            var dataVencimento = DateTime.SpecifyKind(
                new DateTime(mesVencimento.Year, mesVencimento.Month, diaVencimento), 
                DateTimeKind.Utc);
            
            var variacao = (decimal)(random.NextDouble() * 0.2 - 0.1);
            var valorFatura = Math.Round(valorBase * (1 + variacao), 2);

            var status = DeterminarStatusFatura(dataVencimento, hoje, random);

            var fatura = new Faturas(dataVencimento, valorFatura, status, contrato.Id);
            faturas.Add(fatura);
        }

        return faturas;
    }

    private static EFaturaStatus DeterminarStatusFatura(DateTime dataVencimento, DateTime hoje, Random random)
    {
        var diasAteVencimento = (dataVencimento - hoje).Days;

        if (diasAteVencimento > 0)
        {
            return EFaturaStatus.Pendente;
        }

        if (diasAteVencimento < -30)
        {
            return random.NextDouble() < 0.8 ? EFaturaStatus.Paga : EFaturaStatus.Atrasada;
        }

        var probabilidade = random.NextDouble();
        if (probabilidade < 0.6)
            return EFaturaStatus.Paga;
        else if (probabilidade < 0.9)
            return EFaturaStatus.Atrasada;
        else
            return EFaturaStatus.Pendente;
    }

    public static async Task LimparDadosAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TelecomDbContext>();

        try
        {
            await context.Database.ExecuteSqlRawAsync("DELETE FROM \"Faturas\"");
            await context.Database.ExecuteSqlRawAsync("DELETE FROM \"Contratos\"");
            await context.Database.ExecuteSqlRawAsync("DELETE FROM \"Operadoras\"");
        }
        catch (Exception ex)
        {
            throw;
        }
    }
} 