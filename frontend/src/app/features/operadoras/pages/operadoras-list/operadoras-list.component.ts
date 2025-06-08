import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { CardComponent } from '@shared/components/card/card.component';
import { OperadoraService, PagedResult } from '../../../../core/services/operadora.service';
import { Operadora, ETipoServicoOperadora, getTipoServicoTexto } from '../../../../shared/models/operadora.model';

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
  ETipoServicoOperadora = ETipoServicoOperadora;
  
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  pageSizeOptions = [5, 10, 25, 50];

  constructor(
    private operadoraService: OperadoraService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarOperadoras();
  }

  carregarOperadoras(): void {
    this.operadoras = [];
    
    this.operadoraService.getAll().subscribe({
      next: (result: any) => {
        if (Array.isArray(result)) {
          this.operadoras = result;
          this.totalItems = result.length;
        } else if (result && result.items && Array.isArray(result.items)) {
          this.operadoras = result.items;
          this.totalItems = result.total || result.items.length;
        } else if (result && typeof result === 'object') {
          if (result.data && Array.isArray(result.data)) {
            this.operadoras = result.data;
            this.totalItems = result.data.length;
          } else {
            this.operadoras = [];
            this.totalItems = 0;
          }
        } else {
          this.operadoras = [];
          this.totalItems = 0;
        }
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar operadoras: ' + error.message, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end',
          panelClass: ['error-snackbar']
        });
        this.operadoras = [];
        this.totalItems = 0;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.carregarOperadoras();
  }

  getTotalOperadoras(): number {
    return this.operadoras.length;
  }

  getTipoServicoTexto(tipo: ETipoServicoOperadora): string {
    return getTipoServicoTexto(tipo);
  }

  trackByOperadoraId(index: number, operadora: Operadora): any {
    return operadora.id;
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
          next: (response) => {
            
            this.snackBar.open('Operadora excluída com sucesso', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              panelClass: ['success-snackbar']
            });
            
            this.operadoras = this.operadoras.filter(o => o.id !== operadora.id);
            this.totalItems = Math.max(0, this.totalItems - 1);
          },
          error: (error) => {
            let mensagemErro = 'Erro ao excluir operadora';
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