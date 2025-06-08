namespace telecom.Application.DTOs.Dashboard;

public class EvolucaoMensalDto
{
    public string Mes { get; set; } = string.Empty;
    public int Emitidas { get; set; }
    public int Pagas { get; set; }
    public decimal Valor { get; set; }
} 