import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OperadoraService } from '../../../core/services/operadora.service';
import { Operadora, ETipoServicoOperadora, getTipoServicoTexto } from '../../../shared/models/operadora.model';
import { TextInputComponent } from '../../../shared/inputs/text-input/text-input.component';
import { SelectInputComponent } from '../../../shared/inputs/select-input/select-input.component';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
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
    ValidationErrorsComponent,
    PhoneInputComponent
  ],
  templateUrl: './operadora-form.component.html',
  styleUrls: ['./operadora-form.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperadoraFormComponent implements OnInit {
  operadoraForm = this.formBuilder.group({
    nome: ['', Validators.required],
    eTipoServicoOperadora: [null as ETipoServicoOperadora | null, Validators.required],
    contatoSuporte: ['', Validators.required]
  });

  isEditing = false;
  operadoraId: string | null = null;
  validationErrors: string[] = [];

  tipoServicoOptions: SelectOption[] = [
    { label: getTipoServicoTexto(ETipoServicoOperadora.Movel), value: ETipoServicoOperadora.Movel },
    { label: getTipoServicoTexto(ETipoServicoOperadora.Fixo), value: ETipoServicoOperadora.Fixo },
    { label: getTipoServicoTexto(ETipoServicoOperadora.Internet), value: ETipoServicoOperadora.Internet }
  ];

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
          eTipoServicoOperadora: Number(operadora.eTipoServicoOperadora), // Garante que seja número
          contatoSuporte: operadora.contatoSuporte
        });
      }
    });
  }

  onSubmit(): void {
    // Limpa erros anteriores
    this.validationErrors = [];

    if (this.operadoraForm.valid) {
      const formValue = this.operadoraForm.getRawValue();
      const operadora: Partial<Operadora> = {
        nome: formValue.nome,
        eTipoServicoOperadora: Number(formValue.eTipoServicoOperadora), // Converte para número
        contatoSuporte: formValue.contatoSuporte
      };

      console.log('Dados da operadora sendo enviados:', operadora);
      console.log('Tipo do eTipoServicoOperadora:', typeof operadora.eTipoServicoOperadora);

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
        error: (error) => {
          console.error('Erro ao salvar operadora:', error);
          
          // Extrai erros de validação da API
          if (error.message && error.message.includes(':')) {
            const errorParts = error.message.split(':');
            if (errorParts.length > 1) {
              const validationErrorsText = errorParts[1].trim();
              this.validationErrors = validationErrorsText.split(',').map((err: string) => err.trim());
            }
          } else {
            this.validationErrors = [error.message || 'Erro ao salvar operadora'];
          }

          // Mostra snackbar apenas se não houver erros de validação específicos
          if (this.validationErrors.length === 0) {
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
        }
      });
    } else {
      // Marca todos os campos como touched para mostrar os erros
      Object.keys(this.operadoraForm.controls).forEach(key => {
        this.operadoraForm.get(key)?.markAsTouched();
      });

      this.validationErrors = ['Por favor, preencha todos os campos obrigatórios'];
    }
  }


} 