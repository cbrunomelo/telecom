using Microsoft.AspNetCore.Mvc;
using telecom.Application.DTOs.Dashboard;
using telecom.Application.Services.Contracts;
using telecom.Domain.Enuns;
using telecom.Domain.Handlers.Contracts;

namespace telecom.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet]
    public async Task<ActionResult> ObterDadosDashboard(
        [FromQuery] int periodo = 365,
        [FromQuery] Guid? operadoraId = null,
        [FromQuery] EFaturaStatus? status = null)
    {
        var resultado = await _dashboardService.ObterDadosDashboardAsync(periodo, operadoraId, status);

        if (resultado.Sucess)
        {
            return Ok(resultado);
        }
        else
        {
            return BadRequest(resultado);
        }
    }


} 