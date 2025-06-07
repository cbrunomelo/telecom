using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using telecom.Domain.Entitys;

namespace telecom.Infra.Data.Configurations;

public class FaturaConfiguration : EntityBaseConfiguration<Faturas>
{
    protected override void ConfigureEntity(EntityTypeBuilder<Faturas> builder)
    {
        builder.ToTable("TB_FATURA");
        
        builder.Property(e => e.DateEmissao)
            .HasColumnName("DATA_EMISSAO")
            .IsRequired();
            
        builder.Property(e => e.DataVencimento)
            .HasColumnName("DATA_VENCIMENTO")
            .IsRequired();
            
        builder.Property(e => e.ValorCobrado)
            .HasColumnName("VALOR_COBRADO")
            .HasColumnType("decimal(10,2)")
            .IsRequired();
            
        builder.Property(e => e.Status)
            .HasColumnName("STATUS")
            .HasConversion<int>()
            .IsRequired();
            
        builder.Property(e => e.ContratoId)
            .HasColumnName("CONTRATO_ID")
            .IsRequired();


        builder.HasIndex(e => e.ContratoId)
            .HasDatabaseName("IX_faturas_contrato_id");

        builder.HasIndex(e => e.DataVencimento)
            .HasDatabaseName("IX_faturas_data_vencimento");
    }
} 