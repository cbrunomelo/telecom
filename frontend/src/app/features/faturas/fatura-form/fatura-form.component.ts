import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { FaturaService } from '../../../core/services/fatura.service';
import { ContratoService } from '../../../core/services/contrato.service';
import { OperadoraService } from '../../../core/services/operadora.service';
import { Contrato } from '../../../shared/models/contrato.model';
import { Operadora } from '../../../shared/models/operadora.model';
import { Fatura, EFaturaStatus, getFaturaStatusTexto, getFaturaStatusOptions } from '../../../shared/models/fatura.model';
import { SelectInputComponent } from '../../../shared/inputs/select-input/select-input.component';
import { DateInputComponent } from '../../../shared/inputs/date-input/date-input.component';
import { CurrencyInputComponent } from '../../../shared/inputs/currency-input/currency-input.component';
import { TextInputComponent } from '../../../shared/inputs/text-input/text-input.component';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';

interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-fatura-form',
  templateUrl: './fatura-form.component.html',
  styleUrls: ['./fatura-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule,
    SelectInputComponent,
    DateInputComponent,
    CurrencyInputComponent,
    TextInputComponent,
    ValidationErrorsComponent
  ]
})
export class FaturaFormComponent implements OnInit {
  faturaForm = this.formBuilder.group({
    operadoraId: [''],
    contratoId: ['', Validators.required],
    dataVencimento: ['', Validators.required],
    dateEmissao: [{ value: this.formatDateForInput(new Date()), disabled: true }],
    valor: [0, [Validators.required, Validators.min(0)]],
    status: [EFaturaStatus.Pendente, Validators.required]
  });

  operadoras: Operadora[] = [];
  operadorasOptions: SelectOption[] = [];
  contratos: Contrato[] = [];
  contratosOptions: SelectOption[] = [];
  
  statusOptions = getFaturaStatusOptions();
  validationErrors: string[] = [];

  isEditing = false;
  faturaId: string | null = null;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private faturaService: FaturaService,
    private contratoService: ContratoService,
    private operadoraService: OperadoraService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.contratos = [];
    this.contratosOptions = [];
    
    this.carregarOperadoras();
    this.setupOperadoraChange();
    this.setupFormValidationClear();
    
    this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => {
        if (id) {
          this.isEditing = true;
          this.faturaId = id;
          return this.faturaService.getById(id);
        }
        return of(null);
      })
    ).subscribe({
      next: (fatura) => {
        if (fatura) {
          this.contratoService.getById(fatura.contratoId).subscribe({
            next: (contrato) => {
              this.faturaForm.patchValue({
                operadoraId: contrato.operadoraId,
                contratoId: fatura.contratoId,
                dateEmissao: fatura.dateEmissao ? this.formatDateForInput(fatura.dateEmissao) : this.formatDateForInput(new Date()),
                dataVencimento: this.formatDateForInput(fatura.dataVencimento),
                valor: fatura.valor,
                status: fatura.status
              });
              
              this.filtrarContratosPorOperadora(contrato.operadoraId);
            },
            error: () => {
              this.snackBar.open('Erro ao carregar contrato', 'Fechar', {
                duration: 3000,
                horizontalPosition: 'end',
                panelClass: ['error-snackbar']
              });
            }
          });
        }
      },
      error: () => {
        this.snackBar.open('Erro ao carregar fatura', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['error-snackbar']
        });
        this.router.navigate(['/faturas']);
      }
    });
  }

  private carregarOperadoras(): void {
    this.operadoraService.getAll().subscribe({
      next: (operadoras: any) => {
        if (Array.isArray(operadoras)) {
          this.operadoras = operadoras;
        } else if (operadoras && operadoras.items) {
          this.operadoras = operadoras.items;
        } else {
          this.operadoras = [];
        }
        
        this.operadorasOptions = this.operadoras.map(operadora => ({
          label: operadora.nome,
          value: operadora.id
        }));
      },
      error: (error) => {
        this.operadoras = [];
        this.operadorasOptions = [];
      }
    });
  }

  private setupOperadoraChange(): void {
    this.faturaForm.get('operadoraId')?.valueChanges.subscribe(operadoraId => {
      this.faturaForm.patchValue({ contratoId: '' });
      
      if (operadoraId && operadoraId !== '') {
        this.filtrarContratosPorOperadora(operadoraId);
      } else {
        this.contratos = [];
        this.contratosOptions = [];
      }
    });
  }

  private filtrarContratosPorOperadora(operadoraId: string): void {
    this.contratoService.getByOperadora(operadoraId).subscribe({
      next: (contratos: any) => {
        if (Array.isArray(contratos)) {
          this.contratos = contratos;
        } else if (contratos && contratos.items) {
          this.contratos = contratos.items;
        } else {
          this.contratos = [];
        }
        
        const contratosValidos = this.contratos.filter(contrato => 
          contrato.operadoraId === operadoraId || contrato.operadoraId?.toString() === operadoraId.toString()
        );
        
        this.contratosOptions = contratosValidos.map(contrato => ({
          label: `${contrato.nomeFilial} - ${contrato.planoContratado}`,
          value: contrato.id
        }));
      },
      error: (error) => {
        this.contratos = [];
        this.contratosOptions = [];
      }
    });
  }

  onSubmit(): void {
    if (this.faturaForm.valid) {
      const formValue = this.faturaForm.getRawValue();
      
      const fatura: Partial<Fatura> = {
        contratoId: formValue.contratoId,
        valor: formValue.valor,
        dataVencimento: new Date(formValue.dataVencimento),
        dateEmissao: formValue.dateEmissao ? new Date(formValue.dateEmissao) : new Date(),
        status: Number(formValue.status)
      };

      const action = this.isEditing
        ? this.faturaService.update(this.faturaId!, fatura)
        : this.faturaService.create(fatura);

      action.subscribe({
        next: () => {
          this.validationErrors = [];
          this.snackBar.open(
            this.isEditing ? 'Fatura atualizada com sucesso' : 'Fatura criada com sucesso',
            'Fechar',
            {
              duration: 3000,
              horizontalPosition: 'end',
              panelClass: ['success-snackbar']
            }
          );
          this.router.navigate(['/faturas']);
        },
        error: (error) => {
          if (error && error.errors && Array.isArray(error.errors)) {
            this.validationErrors = error.errors;
          } else if (error && error.message) {
            this.validationErrors = [error.message];
          } else if (typeof error === 'string') {
            this.validationErrors = [error];
          } else {
            this.validationErrors = [this.isEditing ? 'Erro ao atualizar fatura' : 'Erro ao criar fatura'];
          }
          
          this.snackBar.open(
            this.isEditing ? 'Erro ao atualizar fatura' : 'Erro ao criar fatura',
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

  private setupFormValidationClear(): void {
    this.faturaForm.valueChanges.subscribe(() => {
      if (this.validationErrors.length > 0) {
        this.validationErrors = [];
      }
    });
  }

  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
} 