import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { CardComponent } from '@shared/components/card/card.component';
import { ContratoService } from '../../../../core/services/contrato.service';
import { Contrato, StatusContrato } from '../../../../shared/models/contrato.model';

@Component({
  selector: 'app-contratos-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    CardComponent,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    ConfirmDialogComponent
  ],
  templateUrl: './contratos-list.component.html',
  styleUrls: ['./contratos-list.component.scss']
})
export class ContratosListComponent implements OnInit {
  contratos: Contrato[] = [];
  StatusContrato = StatusContrato;

  // Paginação
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  pageSizeOptions = [5, 10, 25, 50];

  private readonly statusClasses: Record<StatusContrato, string> = {
    [StatusContrato.ATIVO]: 'badge badge-success',
    [StatusContrato.INATIVO]: 'badge badge-warning',
    [StatusContrato.CANCELADO]: 'badge badge-danger'
  };

  constructor(
    private contratoService: ContratoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarContratos();
  }

  carregarContratos(): void {
    this.contratoService.getAll().subscribe(
      (contratos: Contrato[]) => {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.contratos = contratos.slice(start, end);
        this.totalItems = contratos.length;
      }
    );
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.carregarContratos();
  }

  getStatusClass(status: StatusContrato): string {
    return this.statusClasses[status];
  }

  getContratosAtivos(): number {
    return this.contratos.filter(c => c.status === StatusContrato.ATIVO).length;
  }

  calcularTrendAtivos(): number {
    const total = this.contratos.length;
    if (total === 0) return 0;
    return Math.round((this.getContratosAtivos() / total) * 100);
  }

  calcularValorTotalMensal(): number {
    return this.contratos.reduce((total, contrato) => total + contrato.valorMensal, 0);
  }

  confirmarExclusao(contrato: Contrato): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { 
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir o contrato ${contrato.numero}?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contratoService.delete(contrato.id).subscribe({
          next: () => {
            this.snackBar.open('Contrato excluído com sucesso', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              panelClass: ['success-snackbar']
            });
            this.carregarContratos();
          },
          error: () => {
            this.snackBar.open('Erro ao excluir contrato', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }
} 