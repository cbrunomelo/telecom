using FluentValidation;
using telecom.Domain.Entitys;
using telecom.Domain.Enuns;

namespace telecom.Domain.Validation;

public class FaturasValidator : AbstractValidator<Faturas>
{
    public FaturasValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("ID da fatura é obrigatório")
            .Must(id => id != Guid.Empty).WithMessage("ID da fatura deve ser um GUID válido");
       
        RuleFor(x => x.DataVencimento)
            .GreaterThan(DateTime.Now.Date)
            .WithMessage("Para faturas pendentes, a data de vencimento deve ser futura")
            .When(x => x.Status == EFaturaStatus.Pendente);


        RuleFor(x => x.DataVencimento)
            .LessThan(DateTime.Now.Date)
            .WithMessage("Para faturas atrasadas, a data de vencimento deve ser passada")
            .When(x => x.Status == EFaturaStatus.Atrasada);


        RuleFor(x => x.DataVencimento)
            .NotEmpty().WithMessage("Data de vencimento é obrigatória");


        RuleFor(x => x.ContratoId)
            .NotEmpty().WithMessage("ID do contrato é obrigatório")
            .Must(id => id != Guid.Empty).WithMessage("ID do contrato deve ser um GUID válido");

        RuleFor(x => x.Status)
            .NotEmpty().WithMessage("Status da fatura é obrigatório")
            .IsInEnum().WithMessage("Status deve ser um valor válido (Pendente, Paga, Atrasada)");
        
    }
} 