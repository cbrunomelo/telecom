using FluentValidation;
using telecom.Domain.Commands.FaturaCommands;

namespace telecom.Domain.Validation.Commands.FaturaCommands;

public class CreateFaturaCommandValidator : AbstractValidator<CreateFaturaCommand>
{
    public CreateFaturaCommandValidator()
    {
        RuleFor(x => x.Valor)
            .GreaterThan(0).WithMessage("O valor da fatura deve ser maior que zero")
            .LessThanOrEqualTo(99999999.99m).WithMessage("O valor da fatura deve ser menor ou igual a R$ 99.999.999,99");

        RuleFor(x => x.DataVencimento)
            .NotEmpty().WithMessage("A data de vencimento é obrigatória")
            .GreaterThan(DateTime.Now.Date).WithMessage("A data de vencimento deve ser maior que a data atual - não é possível criar uma fatura vencida");

        RuleFor(x => x.ContratoId)
            .NotEmpty().WithMessage("O ID do contrato é obrigatório")
            .Must(id => id != Guid.Empty).WithMessage("O ID do contrato deve ser um GUID válido");

        RuleFor(x => x.Status)
            .NotEmpty().WithMessage("O status da fatura é obrigatório")
            .IsInEnum().WithMessage("O status deve ser um valor válido (Pendente, Paga, Atrasada)");
    }
} 