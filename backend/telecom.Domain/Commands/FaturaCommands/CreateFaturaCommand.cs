using telecom.Domain.Commands.Contracts;
using telecom.Domain.Entitys;
using telecom.Domain.Enuns;

namespace telecom.Domain.Commands.FaturaCommands;

public class CreateFaturaCommand : ICommand
{
    public decimal Valor { get; set; }
    public DateTime DataVencimento { get; set; }
    public Guid ContratoId { get; set; }

    public EFaturaStatus Status { get; set; }

    public CreateFaturaCommand(decimal valor, DateTime dataVencimento, Guid contratoId, EFaturaStatus status)
    {
        Valor = valor;
        DataVencimento = dataVencimento;
        ContratoId = contratoId;
        Status = status;
    }
}
