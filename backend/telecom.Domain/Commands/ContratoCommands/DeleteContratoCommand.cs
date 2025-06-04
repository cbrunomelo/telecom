using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Commands.Contracts;

namespace telecom.Domain.Commands.ContratoCommands
{
    public class DeleteContratoCommand : ICommand
    {
        public Guid Id { get; set; }
        
        public DeleteContratoCommand(Guid id)
        {
            Id = id;
        }
    }
}
