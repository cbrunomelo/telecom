import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OperadoraService } from '../../../core/services/operadora.service';
import { Operadora, StatusOperadora, TipoServico } from '../../../shared/models/operadora.model';
import { TextInputComponent } from '../../../shared/inputs/text-input/text-input.component';
import { SelectInputComponent } from '../../../shared/inputs/select-input/select-input.component';
import { DateInputComponent } from '../../../shared/inputs/date-input/date-input.component';
import { PhoneInputComponent } from '../../../shared/inputs/phone-input/phone-input.component';

interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-operadora-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule,
    TextInputComponent,
    SelectInputComponent,
    DateInputComponent,
    PhoneInputComponent
  ],
  templateUrl: './operadora-form.component.html',
  styleUrls: ['./operadora-form.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperadoraFormComponent implements OnInit {
  operadoraForm = this.formBuilder.group({
    nome: ['', Validators.required],
    tipoServico: ['', Validators.required] as unknown as [TipoServico, typeof Validators.required],
    contatoSuporte: ['', Validators.required],
    dataCadastro: ['', Validators.required],
    status: ['', Validators.required] as unknown as [StatusOperadora, typeof Validators.required]
  });

  isEditing = false;
  operadoraId: string | null = null;

  statusOptions: SelectOption[] = Object.values(StatusOperadora).map(status => ({
    label: status,
    value: status
  }));

  tipoServicoOptions: SelectOption[] = Object.values(TipoServico).map(tipo => ({
    label: tipo,
    value: tipo
  }));

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private operadoraService: OperadoraService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => {
        if (id) {
          this.isEditing = true;
          this.operadoraId = id;
          return this.operadoraService.getById(id);
        }
        return of(null);
      })
    ).subscribe(operadora => {
      if (operadora) {
        this.operadoraForm.patchValue({
          nome: operadora.nome,
          tipoServico: operadora.tipoServico,
          contatoSuporte: operadora.contatoSuporte,
          dataCadastro: operadora.dataCadastro ? this.formatDateForInput(operadora.dataCadastro) : '',
          status: operadora.status
        });
      }
    });
  }

  onSubmit(): void {
    if (this.operadoraForm.valid) {
      const formValue = this.operadoraForm.getRawValue();
      const operadora: Partial<Operadora> = {
        ...formValue,
        dataCadastro: new Date(formValue.dataCadastro)
      };

      const action = this.isEditing
        ? this.operadoraService.update(this.operadoraId!, operadora as Operadora)
        : this.operadoraService.create(operadora);

      action.subscribe({
        next: () => {
          this.snackBar.open(
            this.isEditing ? 'Operadora atualizada com sucesso' : 'Operadora criada com sucesso',
            'Fechar',
            {
              duration: 3000,
              horizontalPosition: 'end',
              panelClass: ['success-snackbar']
            }
          );
          this.router.navigate(['/operadoras']);
        },
        error: () => {
          this.snackBar.open(
            this.isEditing ? 'Erro ao atualizar operadora' : 'Erro ao criar operadora',
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