using telecom.Domain.Commands.Contracts;
using telecom.Domain.Validation.Commands.ContratoCommands;
using FluentValidation;

namespace telecom.Domain.Commands.ContratoCommands;

public class UpdateContratoCommand : CommandBase<UpdateContratoCommand>
{
    public Guid Id { get; set; }
    public string NomeFilial { get; set; }
    public string PlanoContratado { get; set; }
    public DateTime DataInicio { get; set; }
    public DateTime DataVencimento { get; set; }
    public decimal ValorMensal { get; set; }
    
    public UpdateContratoCommand(Guid id, string nomeFilial, string planoContratado, DateTime dataInicio, DateTime dataVencimento, decimal valorMensal)
    {
        Id = id;
        NomeFilial = nomeFilial;
        PlanoContratado = planoContratado;
        DataInicio = dataInicio;
        DataVencimento = dataVencimento;
        ValorMensal = valorMensal;
    }

    protected override IValidator<UpdateContratoCommand> GetValidator() => new UpdateContratoCommandValidator();
}
