using FluentValidation;
using telecom.Domain.Commands.FaturaCommands;

namespace telecom.Domain.Validation.Commands.FaturaCommands;

public class DeleteFaturaCommandValidator : AbstractValidator<DeleteFaturaCommand>
{
    public DeleteFaturaCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("O ID da fatura é obrigatório")
            .Must(id => id != Guid.Empty).WithMessage("O ID da fatura deve ser um GUID válido");
    }
} 