using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace telecom.Domain.Entitys;

public class Contrato : EntityBase
{
    public string NomeFilial { get; private set; }
    public string PlanoContratado { get; private set; }
    public DateTime DataInicio { get; private set; }
    public DateTime DataVencimento { get; private set; }
    public decimal ValorMensal { get; private set; }

    //navegacao
    public Guid OperadoraId { get; private set; }
    public Operadora Operadora { get; private set; }
    public ICollection<Faturas> Faturas { get; private set; } = new List<Faturas>();

    public Contrato(string nomeFilial, string planoContratado, DateTime dataInicio, DateTime dataVencimento, decimal valorMensal, Guid operadoraId)
    {
        NomeFilial = nomeFilial;
        PlanoContratado = planoContratado;
        DataInicio = dataInicio;
        DataVencimento = dataVencimento;
        ValorMensal = valorMensal;
        OperadoraId = operadoraId;
    }
    public Contrato(){}

    public void Atualizar(string nomeFilial, string planoContratado, DateTime dataInicio, DateTime dataVencimento, decimal valorMensal, Guid operadoraId)
    {
        NomeFilial = nomeFilial;
        PlanoContratado = planoContratado;
        DataInicio = dataInicio;
        DataVencimento = dataVencimento;
        ValorMensal = valorMensal;
        OperadoraId = operadoraId;
    }

    public override string ToString() => $"Contrato: {NomeFilial}, Plano: {PlanoContratado}, Data Início: {DataInicio.ToShortDateString()}, Data Vencimento: {DataVencimento.ToShortDateString()}, Valor Mensal: {ValorMensal:C}";
}
