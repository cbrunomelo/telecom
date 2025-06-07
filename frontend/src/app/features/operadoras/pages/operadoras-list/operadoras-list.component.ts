import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { CardComponent } from '@shared/components/card/card.component';
import { OperadoraService, PagedResult } from '../../../../core/services/operadora.service';
import { Operadora, StatusOperadora, TipoServico } from '../../../../shared/models/operadora.model';

@Component({
  selector: 'app-operadoras-list',
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
  templateUrl: './operadoras-list.component.html',
  styleUrls: ['./operadoras-list.component.scss']
})
export class OperadorasListComponent implements OnInit {
  operadoras: Operadora[] = [];
  StatusOperadora = StatusOperadora;
  TipoServico = TipoServico;
  
  // Paginação
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  pageSizeOptions = [5, 10, 25, 50];

  private readonly statusClasses: Record<StatusOperadora, string> = {
    [StatusOperadora.ATIVO]: 'badge badge-success',
    [StatusOperadora.INATIVO]: 'badge badge-warning'
  };

  constructor(
    private operadoraService: OperadoraService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarOperadoras();
  }

  carregarOperadoras(): void {
    this.operadoraService.getAll({
      page: this.currentPage,
      pageSize: this.pageSize
    }).subscribe(
      (result: PagedResult<Operadora>) => {
        this.operadoras = result.items;
        this.totalItems = result.total;
      }
    );
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.carregarOperadoras();
  }

  getStatusClass(status: StatusOperadora): string {
    return this.statusClasses[status] || '';
  }

  getOperadorasAtivas(): number {
    return this.operadoras.filter(o => o.status === StatusOperadora.ATIVO).length;
  }

  calcularTrendAtivas(): number {
    const total = this.operadoras.length;
    if (total === 0) return 0;
    return Math.round((this.getOperadorasAtivas() / total) * 100);
  }

  confirmarExclusao(operadora: Operadora): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir a operadora ${operadora.nome}?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.operadoraService.delete(operadora.id || '').subscribe({
          next: () => {
            this.snackBar.open('Operadora excluída com sucesso', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              panelClass: ['success-snackbar']
            });
            this.carregarOperadoras();
          },
          error: () => {
            this.snackBar.open('Erro ao excluir operadora', 'Fechar', {
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