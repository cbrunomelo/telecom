using telecom.Domain.Commands.Contracts;

namespace telecom.Domain.Commands.ContratoCommands;

public class CreateContratoCommand : ICommand
{
    public string NomeFilial { get; set; }
    public string PlanoContratado { get; set; }
    public DateTime DataInicio { get; set; }
    public DateTime DataVencimento { get; set; }
    public decimal ValorMensal { get; set; }
    public Guid OperadoraId { get; set; }
    
    public CreateContratoCommand(string nomeFilial, string planoContratado, DateTime dataInicio, DateTime dataVencimento, decimal valorMensal, Guid operadoraId)
    {
        NomeFilial = nomeFilial;
        PlanoContratado = planoContratado;
        DataInicio = dataInicio;
        DataVencimento = dataVencimento;
        ValorMensal = valorMensal;
        OperadoraId = operadoraId;
    }
}
