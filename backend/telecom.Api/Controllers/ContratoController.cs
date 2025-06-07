using Microsoft.AspNetCore.Mvc;
using telecom.Application.DTOs;
using telecom.Application.Services.Contracts;

namespace telecom.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContratoController : ControllerBase
{
    private readonly IContratoService _contratoService;

    public ContratoController(IContratoService contratoService)
    {
        _contratoService = contratoService;
    }

    /// <summary>
    /// Criar um novo contrato
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CriarContrato([FromBody] ContratoDto contratoDto)
    {
        var result = await _contratoService.CriarContratoAsync(contratoDto);
        
        if (result.Sucess)
            return CreatedAtAction(nameof(ObterContratoPorId), new { id = ((ContratoDto)result.Data!).Id }, result);
        
        return BadRequest(result);
    }

    /// <summary>
    /// Atualizar um contrato existente
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarContrato(Guid id, [FromBody] ContratoDto contratoDto)
    {
        var contratoAtualizado = contratoDto with { Id = id };
        var result = await _contratoService.AtualizarContratoAsync(contratoAtualizado);
        
        if (result.Sucess)
            return Ok(result);
        
        return BadRequest(result);
    }

    /// <summary>
    /// Deletar um contrato
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarContrato(Guid id)
    {
        var result = await _contratoService.DeletarContratoAsync(id);
        
        if (result.Sucess)
            return NoContent();
        
        return BadRequest(result);
    }

    /// <summary>
    /// Obter contrato por ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> ObterContratoPorId(Guid id)
    {
        var result = await _contratoService.ObterContratoPorIdAsync(id);
        
        if (result.Sucess)
            return Ok(result);
        
        return NotFound(result);
    }

    /// <summary>
    /// Obter todos os contratos
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> ObterTodosContratos()
    {
        var result = await _contratoService.ObterTodosContratosAsync();
        
        if (result.Sucess)
            return Ok(result);
        
        return BadRequest(result);
    }

    /// <summary>
    /// Obter contratos por operadora
    /// </summary>
    [HttpGet("operadora/{operadoraId}")]
    public async Task<IActionResult> ObterContratosPorOperadora(Guid operadoraId)
    {
        var result = await _contratoService.ObterContratosPorOperadoraAsync(operadoraId);
        
        if (result.Sucess)
            return Ok(result);
        
        return BadRequest(result);
    }
} 