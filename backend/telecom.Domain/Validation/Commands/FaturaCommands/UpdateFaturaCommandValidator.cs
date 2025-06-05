using FluentValidation;
using telecom.Domain.Commands.FaturaCommands;

namespace telecom.Domain.Validation.Commands.FaturaCommands;

public class UpdateFaturaCommandValidator : AbstractValidator<UpdateFaturaCommand>
{
    public UpdateFaturaCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("O ID da fatura é obrigatório")
            .Must(id => id != Guid.Empty).WithMessage("O ID da fatura deve ser um GUID válido");

        RuleFor(x => x.Valor)
            .GreaterThan(0).WithMessage("O valor da fatura deve ser maior que zero")
            .LessThanOrEqualTo(99999999.99m).WithMessage("O valor da fatura deve ser menor ou igual a R$ 99.999.999,99");

        RuleFor(x => x.DataVencimento)
            .NotEmpty().WithMessage("A data de vencimento é obrigatória")
            .GreaterThan(DateTime.Now.Date).WithMessage("A data de vencimento deve ser maior que a data atual");
    }
} 