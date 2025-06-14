﻿using telecom.Domain.Commands.Contracts;
using telecom.Domain.Validation.Commands.ContratoCommands;
using FluentValidation;

namespace telecom.Domain.Commands.ContratoCommands;

public class CreateContratoCommand : CommandBase<CreateContratoCommand>
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

    protected override IValidator<CreateContratoCommand> GetValidator() => new CreateContratoCommandValidator();
}
