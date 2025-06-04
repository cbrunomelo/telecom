using telecom.Domain.Commands.Contracts;
using telecom.Domain.Entitys;

namespace telecom.Domain.Commands.FaturaCommands;

public class CreateFaturaCommand : ICommand
{
    public decimal Valor { get; set; }
    public DateTime DataVencimento { get; set; }
    public Guid ContratoId { get; set; }
    
    public CreateFaturaCommand(decimal valor, DateTime dataVencimento, Guid contratoId)
    {
        Valor = valor;
        DataVencimento = dataVencimento;
        ContratoId = contratoId;
    }
}
