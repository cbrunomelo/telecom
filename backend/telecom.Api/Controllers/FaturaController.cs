using Microsoft.AspNetCore.Mvc;
using telecom.Application.DTOs;
using telecom.Application.Services.Contracts;

namespace telecom.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FaturaController : ControllerBase
{
    private readonly IFaturaService _faturaService;

    public FaturaController(IFaturaService faturaService)
    {
        _faturaService = faturaService;
    }

    /// <summary>
    /// Criar uma nova fatura
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CriarFatura([FromBody] FaturaDto faturaDto)
    {
        var result = await _faturaService.CriarFaturaAsync(faturaDto);
        
        if (result.Sucess)
            return CreatedAtAction(nameof(ObterFaturaPorId), new { id = ((FaturaDto)result.Data!).Id }, result);
        
        return BadRequest(result);
    }

    /// <summary>
    /// Atualizar uma fatura existente
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarFatura(Guid id, [FromBody] FaturaDto faturaDto)
    {
        var faturaAtualizada = faturaDto with { Id = id };
        var result = await _faturaService.AtualizarFaturaAsync(faturaAtualizada);
        
        if (result.Sucess)
            return Ok(result);
        
        return BadRequest(result);
    }

    /// <summary>
    /// Deletar uma fatura
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarFatura(Guid id)
    {
        var result = await _faturaService.DeletarFaturaAsync(id);
        
        if (result.Sucess)
            return NoContent();
        
        return BadRequest(result);
    }

    /// <summary>
    /// Obter fatura por ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> ObterFaturaPorId(Guid id)
    {
        var result = await _faturaService.ObterFaturaPorIdAsync(id);
        
        if (result.Sucess)
            return Ok(result);
        
        return NotFound(result);
    }

    /// <summary>
    /// Obter todas as faturas
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> ObterTodasFaturas()
    {
        var result = await _faturaService.ObterTodasFaturasAsync();
        
        if (result.Sucess)
            return Ok(result);
        
        return BadRequest(result);
    }

    /// <summary>
    /// Obter faturas por contrato
    /// </summary>
    [HttpGet("contrato/{contratoId}")]
    public async Task<IActionResult> ObterFaturasPorContrato(Guid contratoId)
    {
        var result = await _faturaService.ObterFaturasPorContratoAsync(contratoId);
        
        if (result.Sucess)
            return Ok(result);
        
        return BadRequest(result);
    }
} 