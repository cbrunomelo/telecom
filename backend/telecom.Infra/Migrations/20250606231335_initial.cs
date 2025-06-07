using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace telecom.Infra.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TB_OPERADORA",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    NOME = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    TIPO_SERVICO = table.Column<int>(type: "integer", nullable: false),
                    CONTATO_SUPORTE = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_OPERADORA", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "TB_CONTRATO",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    NOME_FILIAL = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    PLANO_CONTRATADO = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    DATA_INICIO = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DATA_VENCIMENTO = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    VALOR_MENSAL = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    OPERADORA_ID = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_CONTRATO", x => x.id);
                    table.ForeignKey(
                        name: "FK_TB_CONTRATO_TB_OPERADORA_OPERADORA_ID",
                        column: x => x.OPERADORA_ID,
                        principalTable: "TB_OPERADORA",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TB_FATURA",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    DATA_EMISSAO = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DATA_VENCIMENTO = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    VALOR_COBRADO = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    STATUS = table.Column<int>(type: "integer", nullable: false),
                    CONTRATO_ID = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_FATURA", x => x.id);
                    table.ForeignKey(
                        name: "FK_TB_FATURA_TB_CONTRATO_CONTRATO_ID",
                        column: x => x.CONTRATO_ID,
                        principalTable: "TB_CONTRATO",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_contratos_operadora_id",
                table: "TB_CONTRATO",
                column: "OPERADORA_ID");

            migrationBuilder.CreateIndex(
                name: "IX_faturas_contrato_id",
                table: "TB_FATURA",
                column: "CONTRATO_ID");

            migrationBuilder.CreateIndex(
                name: "IX_faturas_data_vencimento",
                table: "TB_FATURA",
                column: "DATA_VENCIMENTO");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TB_FATURA");

            migrationBuilder.DropTable(
                name: "TB_CONTRATO");

            migrationBuilder.DropTable(
                name: "TB_OPERADORA");
        }
    }
}
