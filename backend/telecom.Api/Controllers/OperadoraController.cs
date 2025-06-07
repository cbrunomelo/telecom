using Microsoft.AspNetCore.Mvc;
using telecom.Application.DTOs;
using telecom.Application.Services.Contracts;

namespace telecom.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OperadoraController : ControllerBase
{
    private readonly IOperadoraService _operadoraService;

    public OperadoraController(IOperadoraService operadoraService)
    {
        _operadoraService = operadoraService;
    }

    /// <summary>
    /// Criar uma nova operadora
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CriarOperadora([FromBody] OperadoraDto operadoraDto)
    {
        var result = await _operadoraService.CriarOperadoraAsync(operadoraDto);
        
        if (result.Sucess)
            return CreatedAtAction(nameof(ObterOperadoraPorId), new { id = ((OperadoraDto)result.Data!).Id }, result);
        
        return BadRequest(result);
    }

    /// <summary>
    /// Atualizar uma operadora existente
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarOperadora(Guid id, [FromBody] OperadoraDto operadoraDto)
    {
        var operadoraAtualizada = operadoraDto with { Id = id };
        var result = await _operadoraService.AtualizarOperadoraAsync(operadoraAtualizada);
        
        if (result.Sucess)
            return Ok(result);
        
        return BadRequest(result);
    }

    /// <summary>
    /// Deletar uma operadora
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarOperadora(Guid id)
    {
        var result = await _operadoraService.DeletarOperadoraAsync(id);
        
        if (result.Sucess)
            return NoContent();
        
        return BadRequest(result);
    }

    /// <summary>
    /// Obter operadora por ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> ObterOperadoraPorId(Guid id)
    {
        var result = await _operadoraService.ObterOperadoraPorIdAsync(id);
        
        if (result.Sucess)
            return Ok(result);
        
        return NotFound(result);
    }

    /// <summary>
    /// Obter todas as operadoras
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> ObterTodasOperadoras()
    {
        var result = await _operadoraService.ObterTodasOperadorasAsync();
        
        if (result.Sucess)
            return Ok(result);
        
        return BadRequest(result);
    }
} 