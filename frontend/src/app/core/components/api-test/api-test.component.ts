import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { HealthService } from '../../services/health.service';
import { ContratoService } from '../../services/contrato.service';
import { OperadoraService } from '../../services/operadora.service';
import { FaturaService } from '../../services/fatura.service';
import { ApiService } from '../../services/api.service';
import { ApiResponse } from '../../../shared/models/api-response.model';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  duration?: number;
}

@Component({
  selector: 'app-api-test',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="api-test-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon>network_check</mat-icon>
            Teste de Conectividade da API
          </mat-card-title>
          <mat-card-subtitle>
            Verificando conexão com http://localhost:32780/api
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="test-controls">
            <button mat-raised-button color="primary" (click)="runAllTests()" [disabled]="isRunning">
              <mat-icon>play_arrow</mat-icon>
              {{ isRunning ? 'Executando...' : 'Executar Todos os Testes' }}
            </button>
            
            <button mat-stroked-button (click)="clearResults()" [disabled]="isRunning">
              <mat-icon>clear_all</mat-icon>
              Limpar Resultados
            </button>
          </div>

          <div class="test-results" *ngIf="testResults.length > 0">
            <h3>Resultados dos Testes:</h3>
            
            <div class="test-item" *ngFor="let test of testResults" 
                 [ngClass]="'test-' + test.status">
              <div class="test-header">
                <mat-icon>{{ getTestIcon(test.status) }}</mat-icon>
                <span class="test-name">{{ test.name }}</span>
                <span class="test-duration" *ngIf="test.duration">{{ test.duration }}ms</span>
              </div>
              
              <div class="test-message" [ngClass]="'message-' + test.status">
                {{ test.message }}
              </div>
              
              <mat-progress-spinner 
                *ngIf="test.status === 'pending'" 
                diameter="20" 
                mode="indeterminate">
              </mat-progress-spinner>
            </div>
          </div>

          <div class="api-info" *ngIf="!isRunning && testResults.length === 0">
            <h3>Testes Disponíveis:</h3>
            <ul>
              <li>🔗 Conexão Básica - Testa conectividade com o servidor</li>
              <li>✅ Health Check - Verifica se a API está respondendo</li>
              <li>📋 Contratos - Testa endpoint de contratos</li>
              <li>🏢 Operadoras - Testa endpoint de operadoras</li>
              <li>💰 Faturas - Testa endpoint de faturas</li>
            </ul>

            <h3>Estrutura de Resposta Esperada:</h3>
            <div class="code-block">
              <pre>{{'{'}}<br>  "sucess": boolean,<br>  "message": string,<br>  "data": any,<br>  "errors": string[]<br>{{'}'}}</pre>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .api-test-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .test-controls {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .test-results {
      margin-top: 20px;
    }

    .test-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #ddd;
    }

    .test-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 5px;
    }

    .test-name {
      font-weight: 500;
      flex: 1;
    }

    .test-duration {
      font-size: 0.9em;
      color: #666;
    }

    .test-message {
      margin-left: 34px;
      font-size: 0.9em;
    }

    .test-pending {
      background-color: #fff3cd;
      border-color: #ffeaa7;
    }

    .test-success {
      background-color: #d4edda;
      border-color: #c3e6cb;
    }

    .test-error {
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }

    .message-success {
      color: #155724;
    }

    .message-error {
      color: #721c24;
    }

    .message-pending {
      color: #856404;
    }

    .api-info {
      margin-top: 20px;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
    }

    .api-info ul {
      margin: 10px 0;
      padding-left: 20px;
    }

    mat-card-header mat-icon {
      margin-right: 8px;
    }

    .code-block {
      background-color: #2d3748;
      color: #e2e8f0;
      padding: 15px;
      border-radius: 8px;
      margin-top: 10px;
      font-family: 'Courier New', monospace;
    }

    .code-block pre {
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
    }
  `]
})
export class ApiTestComponent implements OnInit {
  testResults: TestResult[] = [];
  isRunning = false;

  constructor(
    private healthService: HealthService,
    private contratoService: ContratoService,
    private operadoraService: OperadoraService,
    private faturaService: FaturaService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async runAllTests(): Promise<void> {
    this.isRunning = true;
    this.testResults = [];

    const tests = [
      { name: 'Conexão Básica', test: () => this.testBasicConnection() },
      { name: 'Health Check', test: () => this.testHealthCheck() },
      { name: 'Contratos API', test: () => this.testContratosAPI() },
      { name: 'Operadoras API', test: () => this.testOperadorasAPI() },
      { name: 'Faturas API', test: () => this.testFaturasAPI() }
    ];

    for (const testCase of tests) {
      const result: TestResult = {
        name: testCase.name,
        status: 'pending',
        message: 'Executando teste...'
      };
      
      this.testResults.push(result);
      
      try {
        const startTime = Date.now();
        await testCase.test();
        const duration = Date.now() - startTime;
        
        result.status = 'success';
        result.message = 'Teste passou com sucesso!';
        result.duration = duration;
      } catch (error: any) {
        result.status = 'error';
        result.message = error.message || 'Erro desconhecido';
      }
    }

    this.isRunning = false;
    
    const successCount = this.testResults.filter(r => r.status === 'success').length;
    const totalCount = this.testResults.length;
    
    if (successCount === totalCount) {
      this.snackBar.open('🎉 Todos os testes passaram!', 'Fechar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    } else {
      this.snackBar.open(`⚠️ ${successCount}/${totalCount} testes passaram`, 'Fechar', {
        duration: 5000,
        panelClass: ['warning-snackbar']
      });
    }
  }

  private async testBasicConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Testa uma requisição GET simples para verificar se o servidor está respondendo
      this.apiService.getFullResponse<any>('/health').subscribe({
        next: (response: ApiResponse<any>) => {
          if (response.sucess) {
            resolve();
          } else {
            reject(new Error(response.message || 'Teste de conexão falhou'));
          }
        },
        error: (error) => reject(error)
      });
    });
  }

  private async testHealthCheck(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.healthService.checkHealth().subscribe({
        next: () => resolve(),
        error: (error) => reject(error)
      });
    });
  }

  private async testContratosAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.contratoService.getAll().subscribe({
        next: () => resolve(),
        error: (error) => reject(error)
      });
    });
  }

  private async testOperadorasAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.operadoraService.getAll().subscribe({
        next: () => resolve(),
        error: (error) => reject(error)
      });
    });
  }

  private async testFaturasAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.faturaService.getAll({ page: 1, pageSize: 10 }).subscribe({
        next: () => resolve(),
        error: (error) => reject(error)
      });
    });
  }

  clearResults(): void {
    this.testResults = [];
  }

  getTestIcon(status: string): string {
    switch (status) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'pending': return 'schedule';
      default: return 'help';
    }
  }
} 