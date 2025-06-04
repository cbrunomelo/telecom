using FluentValidation;
using telecom.Domain.Entitys;
using telecom.Domain.Enuns;

namespace telecom.Domain.Validation;

public class OperadoraValidator : AbstractValidator<Operadora>
{
    public OperadoraValidator()
    {
        RuleFor(x => x.Nome)
            .NotEmpty().WithMessage("Nome da operadora é obrigatório")
            .MaximumLength(100).WithMessage("Nome da operadora deve ter no máximo 100 caracteres")
            .MinimumLength(2).WithMessage("Nome da operadora deve ter pelo menos 2 caracteres");

        RuleFor(x => x.eTipoServicoOperadora)
            .NotEmpty().WithMessage("Tipo de serviço da operadora é obrigatório")
            .IsInEnum().WithMessage("Tipo de serviço deve ser um valor válido (Móvel, Fixo ou Internet)");

        RuleFor(x => x.ContatoSuporte)
            .NotEmpty().WithMessage("Contato de suporte é obrigatório")
            .MaximumLength(50).WithMessage("Contato de suporte deve ter no máximo 50 caracteres")
            .Matches(@"^[\d\s\(\)\-\+]+$").WithMessage("Contato de suporte deve conter apenas números, espaços e caracteres de formatação de telefone");
    }
} 