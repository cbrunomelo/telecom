import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { CardComponent } from '@shared/components/card/card.component';
import { ContratoService } from '../../../../core/services/contrato.service';
import { OperadoraService } from '../../../../core/services/operadora.service';
import { Contrato } from '../../../../shared/models/contrato.model';
import { Operadora } from '../../../../shared/models/operadora.model';
import { forkJoin } from 'rxjs';

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
  operadoras: Operadora[] = [];

  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  pageSizeOptions = [5, 10, 25, 50];

  constructor(
    private contratoService: ContratoService,
    private operadoraService: OperadoraService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarContratos();
  }

  carregarContratos(): void {
    this.contratos = [];
    
    forkJoin({
      contratos: this.contratoService.getAll(),
      operadoras: this.operadoraService.getAll()
    }).subscribe({
      next: (data: any) => {
        this.operadoras = data.operadoras || [];
        
        const contratosData = data.contratos;
        if (contratosData && typeof contratosData === 'object' && 'items' in contratosData && 'total' in contratosData) {
          this.contratos = contratosData.items;
          this.totalItems = contratosData.total;
        } else if (Array.isArray(contratosData)) {
          const start = (this.currentPage - 1) * this.pageSize;
          const end = start + this.pageSize;
          this.contratos = contratosData.slice(start, end);
          this.totalItems = contratosData.length;
        } else {
          this.contratos = [];
          this.totalItems = 0;
        }
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar dados: ' + error.message, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end',
          panelClass: ['error-snackbar']
        });
        this.contratos = [];
        this.operadoras = [];
        this.totalItems = 0;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.carregarContratos();
  }

  getTotalContratos(): number {
    return this.contratos.length;
  }

  calcularValorTotalMensal(): number {
    return this.contratos.reduce((total, contrato) => total + contrato.valorMensal, 0);
  }

  getNomeOperadora(operadoraId: string): string {
    const operadora = this.operadoras.find(op => op.id === operadoraId || op.id?.toString() === operadoraId.toString());
    return operadora ? operadora.nome : `ID: ${operadoraId}`;
  }

  trackByContratoId(index: number, contrato: Contrato): any {
    return contrato.id;
  }

  confirmarExclusao(contrato: Contrato): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { 
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir o contrato da filial ${contrato.nomeFilial}?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contratoService.delete(contrato.id || '').subscribe({
          next: (response) => {
            
            this.snackBar.open('Contrato excluído com sucesso', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              panelClass: ['success-snackbar']
            });
            
            this.contratos = this.contratos.filter(c => c.id !== contrato.id);
            this.totalItems = Math.max(0, this.totalItems - 1);
          },
          error: (error) => {
            let mensagemErro = 'Erro ao excluir contrato';
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