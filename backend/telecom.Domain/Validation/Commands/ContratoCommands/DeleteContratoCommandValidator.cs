using FluentValidation;
using telecom.Domain.Commands.ContratoCommands;

namespace telecom.Domain.Validation.Commands.ContratoCommands;

public class DeleteContratoCommandValidator : AbstractValidator<DeleteContratoCommand>
{
    public DeleteContratoCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("O ID do contrato é obrigatório")
            .Must(id => id != Guid.Empty).WithMessage("O ID do contrato deve ser um GUID válido");
    }
} 