using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Commands.Contracts;
using telecom.Domain.Enuns;

namespace telecom.Domain.Commands.OperadoraCommands
{
    public class UpdateOperadoraCommand : ICommand
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public ETipoServicoOperadora ETipoServicoOperadora { get; set; }
        public string ContatoSuporte { get; set; }
        
        public UpdateOperadoraCommand(Guid id, string nome, ETipoServicoOperadora eTipoServicoOperadora, string contatoSuporte)
        {
            Id = id;
            Nome = nome;
            ETipoServicoOperadora = eTipoServicoOperadora;
            ContatoSuporte = contatoSuporte;
        }
    }
}
