using FluentValidation;
using telecom.Domain.Entitys;

namespace telecom.Domain.Validation;

public class ContratoValidator : AbstractValidator<Contrato>
{
    public ContratoValidator()
    {
        RuleFor(x => x.NomeFilial)
            .NotEmpty().WithMessage("Nome da filial é obrigatório")
            .MaximumLength(100).WithMessage("Nome da filial deve ter no máximo 100 caracteres");

        RuleFor(x => x.PlanoContratado)
            .NotEmpty().WithMessage("Plano contratado é obrigatório")
            .MaximumLength(50).WithMessage("Plano contratado deve ter no máximo 50 caracteres");

        RuleFor(x => x.DataInicio)
            .NotEmpty().WithMessage("Data de início é obrigatória")
            .LessThanOrEqualTo(DateTime.Now).WithMessage("Data de início não pode ser futura");

        RuleFor(x => x.DataVencimento)
            .NotEmpty().WithMessage("Data de vencimento é obrigatória")
            .GreaterThan(x => x.DataInicio).WithMessage("Data de vencimento deve ser posterior à data de início");

        RuleFor(x => x.ValorMensal)
            .GreaterThan(0).WithMessage("Valor mensal deve ser maior que zero")
            .LessThanOrEqualTo(99999.99m).WithMessage("Valor mensal deve ser menor ou igual a R$ 99.999,99");

        RuleFor(x => x.OperadoraId)
            .NotEmpty().WithMessage("ID da operadora é obrigatório");
    }
} 