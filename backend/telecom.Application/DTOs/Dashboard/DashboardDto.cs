namespace telecom.Application.DTOs.Dashboard;

public class DashboardDto
{
    public int TotalFaturas { get; set; }
    public decimal ValorTotalFaturado { get; set; }
    public FaturasStatusDto FaturasStatus { get; set; } = new();
    public List<EvolucaoMensalDto> EvolucaoMensal { get; set; } = new();
} 