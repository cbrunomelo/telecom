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
}
