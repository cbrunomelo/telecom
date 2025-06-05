using FluentValidation;
using telecom.Domain.Commands.OperadoraCommands;

namespace telecom.Domain.Validation.Commands.OperadoraCommands;

public class DeleteOperadoraCommandValidator : AbstractValidator<DeleteOperadoraCommand>
{
    public DeleteOperadoraCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("O ID da operadora é obrigatório")
            .Must(id => id != Guid.Empty).WithMessage("O ID da operadora deve ser um GUID válido");
    }
} 