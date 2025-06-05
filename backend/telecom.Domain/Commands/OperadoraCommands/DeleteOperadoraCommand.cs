using telecom.Domain.Commands.Contracts;
using telecom.Domain.Validation.Commands.OperadoraCommands;
using FluentValidation;

namespace telecom.Domain.Commands.OperadoraCommands;

public class DeleteOperadoraCommand : CommandBase<DeleteOperadoraCommand>
{
    public Guid Id { get; set; }
    
    public DeleteOperadoraCommand(Guid id) => Id = id;

    protected override IValidator<DeleteOperadoraCommand> GetValidator() => new DeleteOperadoraCommandValidator();
}
