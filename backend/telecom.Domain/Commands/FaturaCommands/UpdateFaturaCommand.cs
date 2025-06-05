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
    public class UpdateFaturaCommand : CommandBase<UpdateFaturaCommand>
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

        protected override IValidator<UpdateFaturaCommand> GetValidator() => new UpdateFaturaCommandValidator();
    }
}
