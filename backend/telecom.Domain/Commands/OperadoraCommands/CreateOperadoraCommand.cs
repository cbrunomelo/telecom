using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Commands.Contracts;
using telecom.Domain.Enuns;
using telecom.Domain.Validation.Commands.OperadoraCommands;
using FluentValidation;

namespace telecom.Domain.Commands.OperadoraCommands
{
    public class CreateOperadoraCommand : CommandBase<CreateOperadoraCommand>
    {
        public string Nome { get; set; }
        public ETipoServicoOperadora ETipoServicoOperadora { get; set; }
        public string ContatoSuporte { get; set; }
        
        public CreateOperadoraCommand(string nome, ETipoServicoOperadora eTipoServicoOperadora, string contatoSuporte)
        {
            Nome = nome;
            ETipoServicoOperadora = eTipoServicoOperadora;
            ContatoSuporte = contatoSuporte;
        }

        protected override IValidator<CreateOperadoraCommand> GetValidator() => new CreateOperadoraCommandValidator();
    }
}
