using FluentValidation;
using telecom.Domain.Commands.ContratoCommands;
using telecom.Domain.Validation.Commands.Contracts;

namespace telecom.Domain.Validation.Commands.ContratoCommands;

public class CreateContratoCommandValidator : ICommandValidator<CreateContratoCommand>
{
    public CreateContratoCommandValidator()
    {
        RuleFor(x => x.NomeFilial)
            .NotEmpty().WithMessage("O nome da filial é obrigatório")
            .MaximumLength(100).WithMessage("O nome da filial deve ter no máximo 100 caracteres")
            .MinimumLength(2).WithMessage("O nome da filial deve ter pelo menos 2 caracteres");

        RuleFor(x => x.PlanoContratado)
            .NotEmpty().WithMessage("O plano contratado é obrigatório")
            .MaximumLength(50).WithMessage("O plano contratado deve ter no máximo 50 caracteres");

        RuleFor(x => x.DataInicio)
            .NotEmpty().WithMessage("A data de início é obrigatória")
            .LessThanOrEqualTo(DateTime.Now).WithMessage("A data de início não pode ser futura");

        RuleFor(x => x.DataVencimento)
            .NotEmpty().WithMessage("A data de vencimento é obrigatória")
            .GreaterThan(x => x.DataInicio).WithMessage("A data de vencimento deve ser posterior à data de início");

        RuleFor(x => x.ValorMensal)
            .GreaterThan(0).WithMessage("O valor mensal deve ser maior que zero")
            .LessThanOrEqualTo(99999.99m).WithMessage("O valor mensal deve ser menor ou igual a R$ 99.999,99");

        RuleFor(x => x.OperadoraId)
            .NotEmpty().WithMessage("O ID da operadora é obrigatório")
            .Must(id => id != Guid.Empty).WithMessage("O ID da operadora deve ser um GUID válido");
    }
} 