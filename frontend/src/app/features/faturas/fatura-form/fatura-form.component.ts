import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { FaturaService } from '../../../core/services/fatura.service';
import { ContratoService } from '../../../core/services/contrato.service';
import { Contrato } from '../../../shared/models/contrato.model';
import { Fatura, StatusFatura } from '../../../shared/models/fatura.model';
import { SelectInputComponent } from '../../../shared/inputs/select-input/select-input.component';
import { DateInputComponent } from '../../../shared/inputs/date-input/date-input.component';
import { CurrencyInputComponent } from '../../../shared/inputs/currency-input/currency-input.component';
import { TextInputComponent } from '../../../shared/inputs/text-input/text-input.component';

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
    TextInputComponent
  ]
})
export class FaturaFormComponent implements OnInit {
  faturaForm = this.formBuilder.group({
    contratoId: [0, Validators.required],
    numeroFatura: ['', Validators.required],
    dataEmissao: [{ value: this.formatDateForInput(new Date()), disabled: true }],
    dataVencimento: ['', Validators.required],
    dataPagamento: [''],
    valor: [0, [Validators.required, Validators.min(0)]],
    status: [StatusFatura.PENDENTE, Validators.required]
  });

  contratos$: Observable<Contrato[]>;
  contratosOptions$: Observable<SelectOption[]>;
  
  statusOptions: SelectOption[] = Object.values(StatusFatura).map(status => ({
    label: status,
    value: status
  }));

  isEditing = false;
  faturaId: number | null = null;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private faturaService: FaturaService,
    private contratoService: ContratoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.contratos$ = this.contratoService.getAll();
    this.contratosOptions$ = this.contratos$.pipe(
      map(contratos => contratos.map(contrato => ({
        label: `${contrato.numero} - ${contrato.nomeFilial}`,
        value: contrato.id
      })))
    );

    // Monitora mudanças no status para controlar o campo de data de pagamento
    this.faturaForm.get('status')?.valueChanges.subscribe(status => {
      const dataPagamentoControl = this.faturaForm.get('dataPagamento');
      if (status === StatusFatura.PAGA) {
        dataPagamentoControl?.setValidators([Validators.required]);
        // Sempre define a data atual quando mudar para PAGA
        dataPagamentoControl?.setValue(this.formatDateForInput(new Date()));
      } else {
        dataPagamentoControl?.clearValidators();
        dataPagamentoControl?.setValue('');
      }
      dataPagamentoControl?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => {
        if (id) {
          this.isEditing = true;
          this.faturaId = +id;
          return this.faturaService.getById(+id);
        }
        return of(null);
      })
    ).subscribe({
      next: (fatura) => {
        if (fatura) {
          this.faturaForm.patchValue({
            contratoId: fatura.contratoId,
            numeroFatura: fatura.numeroFatura,
            dataEmissao: this.formatDateForInput(fatura.createdAt),
            dataVencimento: this.formatDateForInput(fatura.dataVencimento),
            dataPagamento: fatura.dataPagamento ? this.formatDateForInput(fatura.dataPagamento) : this.formatDateForInput(new Date()),
            valor: fatura.valor,
            status: fatura.status
          });
        } else {
          // Se for uma nova fatura e o status inicial for PAGA, já define a data atual
          if (this.faturaForm.get('status')?.value === StatusFatura.PAGA) {
            this.faturaForm.get('dataPagamento')?.setValue(this.formatDateForInput(new Date()));
          }
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

  onSubmit(): void {
    if (this.faturaForm.valid) {
      const formValue = this.faturaForm.getRawValue();
      const fatura: Partial<Fatura> = {
        ...formValue,
        dataEmissao: new Date(formValue.dataEmissao),
        dataVencimento: new Date(formValue.dataVencimento),
        dataPagamento: formValue.dataPagamento ? new Date(formValue.dataPagamento) : undefined
      };

      const action = this.isEditing
        ? this.faturaService.update(this.faturaId!, fatura)
        : this.faturaService.create(fatura);

      action.subscribe({
        next: () => {
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
        error: () => {
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

  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
} 