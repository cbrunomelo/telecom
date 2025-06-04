using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Commands.Contracts;

namespace telecom.Domain.Commands.FaturaCommands
{
    public class DeleteFaturaCommand : ICommand
    {
        public Guid Id { get; set; }
        
        public DeleteFaturaCommand(Guid id)
        {
            Id = id;
        }
    }
}
