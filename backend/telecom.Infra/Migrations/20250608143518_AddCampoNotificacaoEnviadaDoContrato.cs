using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace telecom.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddCampoNotificacaoEnviadaDoContrato : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "NOTIFICACAO_VENCIMENTO_ENVIADA",
                table: "TB_CONTRATO",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NOTIFICACAO_VENCIMENTO_ENVIADA",
                table: "TB_CONTRATO");
        }
    }
}
