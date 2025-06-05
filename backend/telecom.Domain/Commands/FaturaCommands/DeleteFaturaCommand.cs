using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Commands.Contracts;
using telecom.Domain.Validation.Commands.FaturaCommands;
using FluentValidation;

namespace telecom.Domain.Commands.FaturaCommands
{
    public class DeleteFaturaCommand : CommandBase<DeleteFaturaCommand>
    {
        public Guid Id { get; set; }
        
        public DeleteFaturaCommand(Guid id) => Id = id;
        

        protected override IValidator<DeleteFaturaCommand> GetValidator() => new DeleteFaturaCommandValidator();
    }
}
