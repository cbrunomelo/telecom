import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { FaturaService, PagedResult } from '../../../../core/services/fatura.service';
import { Fatura, StatusFatura } from '../../../../shared/models/fatura.model';

@Component({
  selector: 'app-faturas-list',
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
  templateUrl: './faturas-list.component.html',
  styleUrls: ['./faturas-list.component.scss']
})
export class FaturasListComponent implements OnInit {
  faturas: Fatura[] = [];
  StatusFatura = StatusFatura;

  // Paginação
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  pageSizeOptions = [5, 10, 25, 50];

  private readonly statusClasses: Record<StatusFatura, string> = {
    [StatusFatura.PAGA]: 'badge badge-success',
    [StatusFatura.PENDENTE]: 'badge badge-warning',
    [StatusFatura.ATRASADA]: 'badge badge-danger'
  };

  constructor(
    private faturaService: FaturaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarFaturas();
  }

  carregarFaturas(): void {
    this.faturaService.getAll({
      page: this.currentPage,
      pageSize: this.pageSize
    }).subscribe(
      (result: PagedResult<Fatura>) => {
        this.faturas = result.items;
        this.totalItems = result.total;
      }
    );
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.carregarFaturas();
  }

  getStatusClass(status: StatusFatura): string {
    return this.statusClasses[status] || 'badge';
  }

  getFaturasPorStatus(status: StatusFatura): number {
    return this.faturas.filter(f => f.status === status).length;
  }

  calcularValorTotal(): number {
    return this.faturas.reduce((total, fatura) => total + fatura.valor, 0);
  }

  calcularTrendPagas(): number {
    const total = this.faturas.length;
    if (total === 0) return 0;
    return Math.round((this.getFaturasPorStatus(StatusFatura.PAGA) / total) * 100);
  }

  calcularTrendAtrasadas(): number {
    const total = this.faturas.length;
    if (total === 0) return 0;
    return Math.round((this.getFaturasPorStatus(StatusFatura.ATRASADA) / total) * 100) * -1;
  }

  confirmarExclusao(fatura: Fatura): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { 
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir a fatura ${fatura.numeroFatura}?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.faturaService.delete(fatura.id).subscribe({
          next: () => {
            this.snackBar.open('Fatura excluída com sucesso', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              panelClass: ['success-snackbar']
            });
            this.carregarFaturas();
          },
          error: () => {
            this.snackBar.open('Erro ao excluir fatura', 'Fechar', {
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