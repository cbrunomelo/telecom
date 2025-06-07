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
  
  // Paginação
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
    console.log('Carregando operadoras...');
    
    // Limpa a lista atual para mostrar que está recarregando
    this.operadoras = [];
    
    this.operadoraService.getAll().subscribe({
      next: (result: any) => {
        console.log('Resposta completa da API:', result);
        console.log('Tipo da resposta:', typeof result);
        console.log('É array?', Array.isArray(result));
        
        // Verifica se result é um array direto ou tem estrutura paginada
        if (Array.isArray(result)) {
          // Resposta é um array direto
          this.operadoras = result;
          this.totalItems = result.length;
          console.log(`${this.operadoras.length} operadoras carregadas (array direto)`);
        } else if (result && result.items && Array.isArray(result.items)) {
          // Resposta tem estrutura paginada
          this.operadoras = result.items;
          this.totalItems = result.total || result.items.length;
          console.log(`${this.operadoras.length} operadoras carregadas (estrutura paginada)`);
        } else if (result && typeof result === 'object') {
          // Verifica se result é um objeto com as operadoras em alguma propriedade
          console.log('Chaves do objeto resultado:', Object.keys(result));
          
          // Tenta algumas possibilidades comuns
          if (result.data && Array.isArray(result.data)) {
            this.operadoras = result.data;
            this.totalItems = result.data.length;
            console.log(`${this.operadoras.length} operadoras carregadas (result.data)`);
          } else {
            console.error('Estrutura de resposta não reconhecida:', result);
            this.operadoras = [];
            this.totalItems = 0;
          }
        } else {
          console.error('Resposta inesperada:', result);
          this.operadoras = [];
          this.totalItems = 0;
        }
      },
      error: (error) => {
        console.error('Erro ao carregar operadoras:', error);
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
        console.log('Iniciando exclusão da operadora:', operadora.id);
        
        this.operadoraService.delete(operadora.id || '').subscribe({
          next: (response) => {
            console.log('Operadora excluída com sucesso:', response);
            
            this.snackBar.open('Operadora excluída com sucesso', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              panelClass: ['success-snackbar']
            });
            
            // Remove a operadora da lista local para atualização imediata
            this.operadoras = this.operadoras.filter(o => o.id !== operadora.id);
            this.totalItems = Math.max(0, this.totalItems - 1);
          },
          error: (error) => {
            console.error('Erro detalhado ao excluir operadora:', error);
            
            // Mensagem de erro mais específica
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