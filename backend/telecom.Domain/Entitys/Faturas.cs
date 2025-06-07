using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Enuns;

namespace telecom.Domain.Entitys;

public class Faturas : EntityBase
{
    public DateTime DateEmissao { get; private set; }

    public DateTime DataVencimento { get; private set; }
    public decimal ValorCobrado { get; private set; }
    public EFaturaStatus Status { get; private set; }

    //navegacao
    public Guid ContratoId { get; private set; }
    public Contrato Contrato { get; private set; }

    public Faturas(DateTime dataVencimento, decimal valorCobrado, EFaturaStatus status, Guid contratoId)
    {
        DateEmissao = DateTime.UtcNow;
        DataVencimento = dataVencimento;
        ValorCobrado = valorCobrado;
        Status = status;
        ContratoId = contratoId;
    }

    public Faturas() { }

    public void Atualizar(DateTime dataVencimento, decimal valorCobrado)
    {
        DataVencimento = dataVencimento;
        ValorCobrado = valorCobrado;
    }

    public void AtualizarStatus(EFaturaStatus status)
    {
        Status = status;
    }

    public override string ToString() => $"Fatura: {Id}, Valor: {ValorCobrado:C}, Vencimento: {DataVencimento.ToShortDateString()}, Status: {Status}";
}
