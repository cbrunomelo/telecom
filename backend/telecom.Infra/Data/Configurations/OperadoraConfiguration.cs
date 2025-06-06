using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using telecom.Domain.Entitys;

namespace telecom.Infra.Data.Configurations;

public class OperadoraConfiguration : EntityBaseConfiguration<Operadora>
{
    protected override void ConfigureEntity(EntityTypeBuilder<Operadora> builder)
    {
        builder.ToTable("TB_OPERADORA");
        
        builder.Property(e => e.Nome)
            .HasColumnName("NOME")
            .HasMaxLength(100)
            .IsRequired();
            
        builder.Property(e => e.eTipoServicoOperadora)
            .HasColumnName("TIPO_SERVICO")
            .HasConversion<int>()
            .IsRequired();
            
        builder.Property(e => e.ContatoSuporte)
            .HasColumnName("CONTATO_SUPORTE")
            .HasMaxLength(50)
            .IsRequired();

        // Relacionamento com Contratos
        builder.HasMany(e => e.Contratos)
            .WithOne(c => c.Operadora)
            .HasForeignKey(c => c.OperadoraId)
            .OnDelete(DeleteBehavior.Restrict);
    }
} 