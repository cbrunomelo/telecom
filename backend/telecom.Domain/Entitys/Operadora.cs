using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Enuns;

namespace telecom.Domain.Entitys;

public class Operadora : EntityBase
{
    public string Nome { get; private set; }
    public ETipoServicoOperadora eTipoServicoOperadora { get; private set; }
    public string ContatoSuporte { get; private set; }

    public List<Contrato> Contratos { get; private set; } = new();
    public Operadora(string nome, ETipoServicoOperadora eTipoServicoOperadora, string contatoSuporte)
    {
        Nome = nome;
        this.eTipoServicoOperadora = eTipoServicoOperadora;
        ContatoSuporte = contatoSuporte;
    }

    public Operadora(){}

    public void Atualizar(string nome, ETipoServicoOperadora eTipoServicoOperadora, string contatoSuporte)
    {
        Nome = nome;
        this.eTipoServicoOperadora = eTipoServicoOperadora;
        ContatoSuporte = contatoSuporte;
    }

    public void AdicionarContrato(Contrato contrato)
    {
        if (contrato == null) return;

        Contratos.Add(contrato);
    }

    public void RemoverContrato(Contrato contrato)
    {
        if (contrato == null) return;
        
        if (!Contratos.Contains(contrato)) return;
        
        Contratos.Remove(contrato);
    }

    public override string ToString() => $"Operadora: {Nome}, Tipo de Serviço: {eTipoServicoOperadora}, Contato Suporte: {ContatoSuporte}";


}
