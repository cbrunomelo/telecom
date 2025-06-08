using Microsoft.EntityFrameworkCore;
using System.Globalization;
using telecom.Application.DTOs.Dashboard;
using telecom.Application.Services.Contracts;
using telecom.Domain.Enuns;
using telecom.Domain.Handlers.Contracts;
using telecom.Domain.Handlers.Response;
using telecom.Infra.Data;

namespace telecom.Application.Services;

public class DashboardService : IDashboardService
{
    private readonly TelecomDbContext _context;

    public DashboardService(TelecomDbContext context)
    {
        _context = context;
    }

    public async Task<IHandleResult> ObterDadosDashboardAsync(int periodoDias = 365, Guid? operadoraId = null, EFaturaStatus? status = null)
    {
        try
        {
            var dataLimite = DateTime.UtcNow.AddDays(-periodoDias);

            var query = _context.Faturas
                .Include(f => f.Contrato)
                .Where(f => f.DateEmissao >= dataLimite);

            if (operadoraId.HasValue)
                query = query.Where(f => f.Contrato.OperadoraId == operadoraId.Value);

            if (status.HasValue)
                query = query.Where(f => f.Status == status.Value);

            var faturas = await query.ToListAsync();


            var totalFaturas = faturas.Count;
            var valorTotalFaturado = faturas.Sum(f => f.ValorCobrado);

            var faturasStatus = new FaturasStatusDto
            {
                Pagas = faturas.Count(f => f.Status == EFaturaStatus.Paga),
                Pendentes = faturas.Count(f => f.Status == EFaturaStatus.Pendente),
                Atrasadas = faturas.Count(f => f.Status == EFaturaStatus.Atrasada)
            };

            var evolucaoMensal = faturas
                .GroupBy(f => new { f.DateEmissao.Year, f.DateEmissao.Month })
                .OrderBy(g => g.Key.Year)
                .ThenBy(g => g.Key.Month)
                .Select(g => new EvolucaoMensalDto
                {
                    Mes = new DateTime(g.Key.Year, g.Key.Month, 1).ToString("MMM yyyy", new CultureInfo("pt-BR")),
                    Emitidas = g.Count(),
                    Pagas = g.Count(f => f.Status == EFaturaStatus.Paga),
                    Valor = g.Sum(f => f.ValorCobrado)
                })
                .ToList();

            var dashboardDto = new DashboardDto
            {
                TotalFaturas = totalFaturas,
                ValorTotalFaturado = valorTotalFaturado,
                FaturasStatus = faturasStatus,
                EvolucaoMensal = evolucaoMensal
            };

            return new HandleResult(true, "Dados do dashboard obtidos com sucesso", dashboardDto);
        }
        catch (Exception ex)
        {
            return new HandleResult("Erro interno ao buscar dados do dashboard", ex.Message);
        }
    }

}