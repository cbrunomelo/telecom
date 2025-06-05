using FluentValidation;
using telecom.Domain.Commands.OperadoraCommands;

namespace telecom.Domain.Validation.Commands.OperadoraCommands;

public class UpdateOperadoraCommandValidator : AbstractValidator<UpdateOperadoraCommand>
{
    public UpdateOperadoraCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("O ID da operadora é obrigatório")
            .Must(id => id != Guid.Empty).WithMessage("O ID da operadora deve ser um GUID válido");

        RuleFor(x => x.Nome)
            .NotEmpty().WithMessage("O nome da operadora é obrigatório")
            .MaximumLength(100).WithMessage("O nome da operadora deve ter no máximo 100 caracteres")
            .MinimumLength(2).WithMessage("O nome da operadora deve ter pelo menos 2 caracteres");

        RuleFor(x => x.ETipoServicoOperadora)
            .NotEmpty().WithMessage("O tipo de serviço da operadora é obrigatório")
            .IsInEnum().WithMessage("O tipo de serviço deve ser um valor válido (Móvel, Fixo ou Internet)");

        RuleFor(x => x.ContatoSuporte)
            .NotEmpty().WithMessage("O contato de suporte é obrigatório")
            .MaximumLength(50).WithMessage("O contato de suporte deve ter no máximo 50 caracteres")
            .Matches(@"^[\d\s\(\)\-\+]+$").WithMessage("O contato de suporte deve conter apenas números, espaços e caracteres de formatação de telefone");
    }
} 