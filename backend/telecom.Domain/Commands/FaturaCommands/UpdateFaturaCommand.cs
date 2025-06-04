using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Commands.Contracts;

namespace telecom.Domain.Commands.FaturaCommands
{
    public class UpdateFaturaCommand : ICommand
    {
        public Guid Id { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataVencimento { get; set; }
        
        public UpdateFaturaCommand(Guid id, decimal valor, DateTime dataVencimento)
        {
            Id = id;
            Valor = valor;
            DataVencimento = dataVencimento;
        }
    }
}
