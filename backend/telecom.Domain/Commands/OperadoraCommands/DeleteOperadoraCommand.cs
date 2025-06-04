using telecom.Domain.Commands.Contracts;

namespace telecom.Domain.Commands.OperadoraCommands;

public class DeleteOperadoraCommand : ICommand
{
    public Guid Id { get; set; }
    
    public DeleteOperadoraCommand(Guid id)
    {
        Id = id;
    }
}
