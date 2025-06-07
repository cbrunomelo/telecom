import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ContratoService } from '../../../core/services/contrato.service';
import { OperadoraService } from '../../../core/services/operadora.service';
import { Operadora } from '../../../shared/models/operadora.model';
import { Contrato } from '../../../shared/models/contrato.model';
import { TextInputComponent } from '../../../shared/inputs/text-input/text-input.component';
import { SelectInputComponent } from '../../../shared/inputs/select-input/select-input.component';
import { DateInputComponent } from '../../../shared/inputs/date-input/date-input.component';
import { CurrencyInputComponent } from '../../../shared/inputs/currency-input/currency-input.component';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';

interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-contrato-form',
  templateUrl: './contrato-form.component.html',
  styleUrls: ['./contrato-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule,
    TextInputComponent,
    SelectInputComponent,
    DateInputComponent,
    CurrencyInputComponent,
    ValidationErrorsComponent
  ]
})
export class ContratoFormComponent implements OnInit {
  contratoForm = this.formBuilder.group({
    nomeFilial: ['', Validators.required],
    operadoraId: ['', Validators.required],
    planoContratado: ['', Validators.required],
    dataInicio: ['', Validators.required],
    dataVencimento: ['', Validators.required],
    valorMensal: [0, [Validators.required, Validators.min(0)]],
  });

  operadoras: Operadora[] = [];
  operadorasOptions: SelectOption[] = [];

  isEditing = false;
  contratoId: string | null = null;
  validationErrors: string[] = [];
  isLoading = true;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private contratoService: ContratoService,
    private operadoraService: OperadoraService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    // Propriedades são inicializadas no ngOnInit
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => {
        if (id) {
          this.isEditing = true;
          this.contratoId = id;
          // Carrega contrato e operadoras simultaneamente
          return forkJoin({
            contrato: this.contratoService.getById(id),
            operadoras: this.operadoraService.getAll()
          });
        }
        // Se não for edição, só carrega as operadoras
        return forkJoin({
          contrato: of(null),
          operadoras: this.operadoraService.getAll()
        });
      })
    ).subscribe({
      next: ({ contrato, operadoras }) => {
        console.log('Dados carregados:', { contrato, operadoras });
        console.log('Estrutura operadoras:', operadoras);
        
        // Configura as operadoras disponíveis - trata diferentes estruturas de resposta
        const operadorasData = operadoras as any;
        if (Array.isArray(operadorasData)) {
          // Se operadoras é um array direto
          this.operadoras = operadorasData;
        } else if (operadorasData && operadorasData.items && Array.isArray(operadorasData.items)) {
          // Se operadoras tem a propriedade items
          this.operadoras = operadorasData.items;
        } else if (operadorasData && operadorasData.data && Array.isArray(operadorasData.data)) {
          // Se operadoras tem a propriedade data
          this.operadoras = operadorasData.data;
        } else {
          // Fallback - array vazio
          console.error('Estrutura de operadoras não reconhecida:', operadoras);
          this.operadoras = [];
        }
        
        this.operadorasOptions = (this.operadoras || []).map(operadora => ({
          label: `${operadora.nome} - ${operadora.tipoServico}`,
          value: operadora.id || ''
        }));
        
        console.log('Operadoras processadas:', this.operadoras);
        console.log('Operadoras options:', this.operadorasOptions);
        
        if (contrato && typeof contrato === 'object') {
          console.log('Preenchendo formulário com contrato:', contrato);
          
          try {
            this.contratoForm.patchValue({
              nomeFilial: contrato.nomeFilial || '',
              operadoraId: contrato.operadoraId || '',
              planoContratado: contrato.planoContratado || '',
              dataInicio: contrato.dataInicio ? this.formatDateForInput(contrato.dataInicio) : '',
              dataVencimento: contrato.dataVencimento ? this.formatDateForInput(contrato.dataVencimento) : '',
              valorMensal: contrato.valorMensal || 0
            });
            
            console.log('Operadora selecionada:', contrato.operadoraId);
            console.log('Operadoras disponíveis:', (this.operadoras || []).map(op => ({ id: op.id, nome: op.nome })));
            
            // Força a atualização do select após um pequeno delay para garantir que as opções estejam carregadas
            setTimeout(() => {
              if (contrato.operadoraId) {
                this.contratoForm.patchValue({
                  operadoraId: contrato.operadoraId
                });
                console.log('Operadora forçada:', contrato.operadoraId);
              }
            }, 100);
          } catch (error) {
            console.error('Erro ao preencher formulário:', error);
          }
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
        this.isLoading = false;
        this.snackBar.open('Erro ao carregar dados', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onSubmit(): void {
    // Limpa erros de validação anteriores
    this.validationErrors = [];
    
    if (this.contratoForm.valid) {
      const formValue = this.contratoForm.getRawValue();
      const contrato: Partial<Contrato> = {
        ...formValue,
        dataInicio: new Date(formValue.dataInicio),
        dataVencimento: new Date(formValue.dataVencimento)
      };

      const action = this.isEditing
        ? this.contratoService.update(this.contratoId!, contrato)
        : this.contratoService.create(contrato);

      action.subscribe({
        next: () => {
          this.snackBar.open(
            this.isEditing ? 'Contrato atualizado com sucesso' : 'Contrato criado com sucesso',
            'Fechar',
            {
              duration: 3000,
              horizontalPosition: 'end',
              panelClass: ['success-snackbar']
            }
          );
          this.router.navigate(['/contratos']);
        },
        error: (error) => {
          // Captura erros de validação da API
          this.extractValidationErrors(error);
          
          this.snackBar.open(
            this.isEditing ? 'Erro ao atualizar contrato' : 'Erro ao criar contrato',
            'Fechar',
            {
              duration: 3000,
              horizontalPosition: 'end',
              panelClass: ['error-snackbar']
            }
          );
        }
      });
    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'end',
        panelClass: ['error-snackbar']
      });
    }
  }

  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  private extractValidationErrors(error: any): void {
    this.validationErrors = [];
    
    try {
      // Tenta extrair erros do formato ApiResponse (HandleResult)
      if (error.error && error.error.errors && Array.isArray(error.error.errors)) {
        this.validationErrors = error.error.errors;
      }
      // Tenta extrair erros de outras possíveis estruturas
      else if (error.errors && Array.isArray(error.errors)) {
        this.validationErrors = error.errors;
      }
      // Se for uma string simples
      else if (typeof error.message === 'string') {
        this.validationErrors = [error.message];
      }
      // Fallback para erro genérico
      else {
        this.validationErrors = ['Ocorreu um erro ao processar a solicitação'];
      }
    } catch (e) {
      this.validationErrors = ['Erro inesperado ao processar resposta do servidor'];
    }
  }
} 