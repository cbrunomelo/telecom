using telecom.Domain.Enuns;
using telecom.Domain.Handlers.Contracts;

namespace telecom.Application.Services.Contracts;

public interface IDashboardService
{
    Task<IHandleResult> ObterDadosDashboardAsync(int periodoDias = 365, Guid? operadoraId = null, EFaturaStatus? status = null);
} 