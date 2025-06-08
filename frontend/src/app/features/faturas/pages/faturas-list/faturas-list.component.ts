import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { FaturaService } from '../../../../core/services/fatura.service';
import { Fatura, EFaturaStatus, getFaturaStatusTexto } from '../../../../shared/models/fatura.model';

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
  EFaturaStatus = EFaturaStatus;
  
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  pageSizeOptions = [5, 10, 25, 50];

  private readonly statusClasses: Record<EFaturaStatus, string> = {
    [EFaturaStatus.Paga]: 'badge badge-success',
    [EFaturaStatus.Pendente]: 'badge badge-warning',
    [EFaturaStatus.Atrasada]: 'badge badge-danger',
    [EFaturaStatus.Cancelada]: 'badge badge-secondary'
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
    this.faturas = [];
    
    this.faturaService.getAll().subscribe({
      next: (data: any) => {
        if (data && typeof data === 'object' && 'items' in data && 'total' in data) {
          this.faturas = data.items;
          this.totalItems = data.total;
        } else if (Array.isArray(data)) {
          const start = (this.currentPage - 1) * this.pageSize;
          const end = start + this.pageSize;
          this.faturas = data.slice(start, end);
          this.totalItems = data.length;
        } else {
          this.faturas = [];
          this.totalItems = 0;
        }
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar faturas: ' + error.message, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end',
          panelClass: ['error-snackbar']
        });
        this.faturas = [];
        this.totalItems = 0;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.carregarFaturas();
  }

  getStatusClass(status: EFaturaStatus): string {
    return this.statusClasses[status] || 'badge';
  }

  getFaturaStatusTexto(status: EFaturaStatus): string {
    return getFaturaStatusTexto(status);
  }

  getFaturasPorStatus(status: EFaturaStatus): number {
    if (!this.faturas || !Array.isArray(this.faturas)) return 0;
    return this.faturas.filter(f => f.status === status).length;
  }

  calcularValorTotal(): number {
    if (!this.faturas || !Array.isArray(this.faturas)) return 0;
    return this.faturas.reduce((total, fatura) => total + fatura.valor, 0);
  }

  calcularTrendPagas(): number {
    if (!this.faturas || !Array.isArray(this.faturas)) return 0;
    const total = this.faturas.length;
    if (total === 0) return 0;
    return Math.round((this.getFaturasPorStatus(EFaturaStatus.Paga) / total) * 100);
  }

  calcularTrendAtrasadas(): number {
    if (!this.faturas || !Array.isArray(this.faturas)) return 0;
    const total = this.faturas.length;
    if (total === 0) return 0;
    return Math.round((this.getFaturasPorStatus(EFaturaStatus.Atrasada) / total) * 100) * -1;
  }

  confirmarExclusao(fatura: Fatura): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { 
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir a fatura de valor ${fatura.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.faturaService.delete(fatura.id || '').subscribe({
          next: (response) => {
            
            this.snackBar.open('Fatura excluída com sucesso', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              panelClass: ['success-snackbar']
            });
            
            this.faturas = this.faturas.filter(f => f.id !== fatura.id);
            this.totalItems = Math.max(0, this.totalItems - 1);
          },
          error: (error) => {
            let mensagemErro = 'Erro ao excluir fatura';
            if (error.message) {
              mensagemErro = error.message;
            } else if (typeof error === 'string') {
              mensagemErro = error;
            }
            
            this.snackBar.open(mensagemErro, 'Fechar', {
              duration: 5000,
              horizontalPosition: 'end',
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }
} 