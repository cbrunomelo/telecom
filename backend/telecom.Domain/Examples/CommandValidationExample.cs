using System;
using telecom.Domain.Commands.FaturaCommands;
using telecom.Domain.Commands.ContratoCommands;
using telecom.Domain.Commands.OperadoraCommands;
using telecom.Domain.Enuns;

namespace telecom.Domain.Examples;

/// <summary>
/// Exemplo de como usar o sistema de validação centralizado de Commands
/// ✅ Validação centralizada na CommandBase
/// ✅ Cada comando define apenas seu próprio validator
/// ✅ Código mais limpo e organizado
/// </summary>
public class CommandValidationExample
{
    public void ExemploValidacaoFaturaComNovaEstrutura()
    {
        Console.WriteLine("=== Sistema de Validação Centralizado ===\n");

        // ❌ Exemplo 1: Tentativa de criar uma fatura com data de vencimento no passado (inválido)
        var faturaComDataVencida = new CreateFaturaCommand(
            valor: 100.50m,
            dataVencimento: DateTime.Now.AddDays(-1), // Data no passado - INVÁLIDO!
            contratoId: Guid.NewGuid(),
            status: EFaturaStatus.Pendente
        );

        Console.WriteLine("🔍 Validando fatura com data vencida...");
        if (!faturaComDataVencida.IsValid())
        {
            Console.WriteLine("❌ Erro ao criar fatura:");
            foreach (var erro in faturaComDataVencida.ValidationErrors)
            {
                Console.WriteLine($"   • {erro}");
            }
        }

        Console.WriteLine();

        // ✅ Exemplo 2: Criar uma fatura válida
        var faturaValida = new CreateFaturaCommand(
            valor: 250.75m,
            dataVencimento: DateTime.Now.AddDays(30), // Data futura - VÁLIDO!
            contratoId: Guid.NewGuid(),
            status: EFaturaStatus.Pendente
        );

        Console.WriteLine("🔍 Validando fatura com data futura...");
        if (faturaValida.IsValid())
        {
            Console.WriteLine("✅ Fatura válida - pode ser processada!");
        }
    }

    public void ExemploValidacaoContratoComNovaEstrutura()
    {
        Console.WriteLine("\n=== Validação de Contrato ===\n");

        // ❌ Exemplo: Contrato com múltiplos erros
        var contratoInvalido = new CreateContratoCommand(
            nomeFilial: "A", // Nome muito curto
            planoContratado: "", // Vazio
            dataInicio: DateTime.Now,
            dataVencimento: DateTime.Now.AddDays(-10), // Data anterior ao início
            valorMensal: -50.00m, // Valor negativo
            operadoraId: Guid.Empty // GUID inválido
        );

        Console.WriteLine("🔍 Validando contrato com múltiplos erros...");
        if (!contratoInvalido.IsValid())
        {
            Console.WriteLine("❌ Erros encontrados no contrato:");
            foreach (var erro in contratoInvalido.ValidationErrors)
            {
                Console.WriteLine($"   • {erro}");
            }
        }
    }

    public void ExemploValidacaoOperadoraComNovaEstrutura()
    {
        Console.WriteLine("\n=== Validação de Operadora ===\n");

        // ❌ Exemplo: Operadora com contato inválido
        var operadoraInvalida = new CreateOperadoraCommand(
            nome: "X", // Nome muito curto
            eTipoServicoOperadora: ETipoServicoOperadora.Movel,
            contatoSuporte: "abc123def" // Formato inválido de telefone
        );

        Console.WriteLine("🔍 Validando operadora com dados inválidos...");
        if (!operadoraInvalida.IsValid())
        {
            Console.WriteLine("❌ Erros encontrados na operadora:");
            foreach (var erro in operadoraInvalida.ValidationErrors)
            {
                Console.WriteLine($"   • {erro}");
            }
        }

        Console.WriteLine();

        // ✅ Exemplo: Operadora válida
        var operadoraValida = new CreateOperadoraCommand(
            nome: "TeleCom Brasil S.A.",
            eTipoServicoOperadora: ETipoServicoOperadora.Movel,
            contatoSuporte: "+55 11 99999-9999"
        );

        Console.WriteLine("🔍 Validando operadora com dados válidos...");
        if (operadoraValida.IsValid())
        {
            Console.WriteLine("✅ Operadora válida - pode ser processada!");
        }
    }

    public void ExemploValidacaoDelete()
    {
        Console.WriteLine("\n=== Validação de Delete ===\n");

        // ❌ Exemplo: Tentativa de deletar com GUID vazio
        var deleteInvalido = new DeleteFaturaCommand(Guid.Empty);

        Console.WriteLine("🔍 Validando delete com GUID vazio...");
        if (!deleteInvalido.IsValid())
        {
            Console.WriteLine("❌ Erro ao deletar fatura:");
            foreach (var erro in deleteInvalido.ValidationErrors)
            {
                Console.WriteLine($"   • {erro}");
            }
        }
    }

    /// <summary>
    /// Demonstra como a validação é consistente em todos os commands
    /// </summary>
    public void ExemploValidacaoConsistente()
    {
        Console.WriteLine("\n=== Consistência da Validação ===\n");

        var commands = new object[]
        {
            new CreateFaturaCommand(0, DateTime.Now.AddDays(-1), Guid.Empty, EFaturaStatus.Pendente),
            new CreateContratoCommand("", "", DateTime.Now, DateTime.Now.AddDays(-1), 0, Guid.Empty),
            new CreateOperadoraCommand("", ETipoServicoOperadora.Movel, ""),
            new DeleteFaturaCommand(Guid.Empty)
        };

        foreach (var command in commands)
        {
            if (command is ICommand cmd)
            {
                Console.WriteLine($"🔍 Validando {command.GetType().Name}...");
                var isValid = cmd.IsValid();
                Console.WriteLine($"   Status: {(isValid ? "✅ Válido" : "❌ Inválido")}");
                
                if (!isValid)
                {
                    Console.WriteLine($"   Erros: {cmd.ValidationErrors.Count}");
                }
                Console.WriteLine();
            }
        }
    }
} 