using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using telecom.Domain.Entitys;

namespace telecom.Infra.Data.Configurations;

public class ContratoConfiguration : EntityBaseConfiguration<Contrato>
{
    protected override void ConfigureEntity(EntityTypeBuilder<Contrato> builder)
    {
        builder.ToTable("TB_CONTRATO");
        
        builder.Property(e => e.NomeFilial)
            .HasColumnName("NOME_FILIAL")
            .HasMaxLength(100)
            .IsRequired();
            
        builder.Property(e => e.PlanoContratado)
            .HasColumnName("PLANO_CONTRATADO")
            .HasMaxLength(50)
            .IsRequired();
            
        builder.Property(e => e.DataInicio)
            .HasColumnName("DATA_INICIO")
            .IsRequired();
            
        builder.Property(e => e.DataVencimento)
            .HasColumnName("DATA_VENCIMENTO")
            .IsRequired();
            
        builder.Property(e => e.ValorMensal)
            .HasColumnName("VALOR_MENSAL")
            .HasColumnType("decimal(10,2)")
            .IsRequired();
            
        builder.Property(e => e.OperadoraId)
            .HasColumnName("OPERADORA_ID")
            .IsRequired();

        builder.HasOne(e => e.Operadora)
            .WithMany(o => o.Contratos)
            .HasForeignKey(e => e.OperadoraId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(e => e.Faturas)
            .WithOne(f => f.Contrato)
            .HasForeignKey(f => f.ContratoId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(e => e.OperadoraId)
            .HasDatabaseName("IX_contratos_operadora_id");
    }
} 