using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Commands.Contracts;
using telecom.Domain.Validation.Commands.ContratoCommands;
using FluentValidation;

namespace telecom.Domain.Commands.ContratoCommands;

public class DeleteContratoCommand : CommandBase<DeleteContratoCommand>
{
    public Guid Id { get; set; }
    
    public DeleteContratoCommand(Guid id) => Id = id;
    

    protected override IValidator<DeleteContratoCommand> GetValidator() => new DeleteContratoCommandValidator();
}
