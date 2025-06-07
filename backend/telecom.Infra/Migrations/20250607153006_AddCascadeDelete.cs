using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace telecom.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddCascadeDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TB_CONTRATO_TB_OPERADORA_OPERADORA_ID",
                table: "TB_CONTRATO");

            migrationBuilder.DropForeignKey(
                name: "FK_TB_FATURA_TB_CONTRATO_CONTRATO_ID",
                table: "TB_FATURA");

            migrationBuilder.AddForeignKey(
                name: "FK_TB_CONTRATO_TB_OPERADORA_OPERADORA_ID",
                table: "TB_CONTRATO",
                column: "OPERADORA_ID",
                principalTable: "TB_OPERADORA",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TB_FATURA_TB_CONTRATO_CONTRATO_ID",
                table: "TB_FATURA",
                column: "CONTRATO_ID",
                principalTable: "TB_CONTRATO",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TB_CONTRATO_TB_OPERADORA_OPERADORA_ID",
                table: "TB_CONTRATO");

            migrationBuilder.DropForeignKey(
                name: "FK_TB_FATURA_TB_CONTRATO_CONTRATO_ID",
                table: "TB_FATURA");

            migrationBuilder.AddForeignKey(
                name: "FK_TB_CONTRATO_TB_OPERADORA_OPERADORA_ID",
                table: "TB_CONTRATO",
                column: "OPERADORA_ID",
                principalTable: "TB_OPERADORA",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TB_FATURA_TB_CONTRATO_CONTRATO_ID",
                table: "TB_FATURA",
                column: "CONTRATO_ID",
                principalTable: "TB_CONTRATO",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
