import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="input-container">
      <label *ngIf="label">{{ label }}</label>
      <div class="input-wrapper">
        <input
          type="text"
          [placeholder]="placeholder"
          [(ngModel)]="displayValue"
          (ngModelChange)="onInputChange($event)"
          (blur)="onBlur()"
          [disabled]="disabled"
          [class.is-invalid]="errorMessage"
          (focus)="onFocus($event)"
          (click)="onClick($event)"
        />
        <i class="fa-solid fa-money-bill-wave input-icon"></i>
      </div>
      <div class="error-message" *ngIf="errorMessage">{{ errorMessage }}</div>
    </div>
  `,
  styles: [`
    .input-container {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      width: 100%;
    }

    label {
      font-size: 0.875rem;
      color: #495057;
      margin-bottom: 0.5rem;
    }

    .input-wrapper {
      position: relative;
      width: 100%;
    }

    input {
      width: 100%;
      padding: 0.75rem 2.5rem;
      font-size: 1rem;
      line-height: 1.5;
      color: #495057;
      background-color: #f8f9fa;
      border: 1px solid #ced4da;
      border-radius: 0.5rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      text-align: right;
      cursor: text;
      user-select: all;

      &:focus {
        outline: none;
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }

      &:disabled {
        background-color: #e9ecef;
        cursor: not-allowed;

        & + .input-icon {
          opacity: 0.5;
        }
      }

      &.is-invalid {
        border-color: #dc3545;
        
        &:focus {
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }
      }
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6c757d;
      pointer-events: none;
      font-size: 1rem;
    }

    .error-message {
      font-size: 0.875rem;
      color: #dc3545;
      margin-top: 0.25rem;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true
    }
  ]
})
export class CurrencyInputComponent extends BaseInputComponent implements ControlValueAccessor {
  @Input() placeholder = 'R$ 0,00';
  @Input() disabled = false;

  value: number = 0;
  displayValue: string = '';

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    super();
    this.control = new FormControl('');
  }

  writeValue(value: number | null): void {
    const numericValue = this.ensureNumericValue(value);
    this.value = numericValue;
    this.displayValue = this.formatCurrency(numericValue);
    this.control.setValue(numericValue, { emitEvent: false });
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  onInputChange(value: string): void {
    const numericValue = this.parseValue(value);
    this.value = numericValue;
    this.displayValue = this.formatCurrency(numericValue);
    this.onChange(numericValue);
  }

  onBlur(): void {
    this.onTouched();
    this.displayValue = this.formatCurrency(this.value);
  }

  onFocus(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    input.select();
  }

  onClick(event: MouseEvent): void {
    const input = event.target as HTMLInputElement;
    input.select();
  }

  private formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  private parseValue(value: string): number {
    if (!value) return 0;
    const cleanValue = value.replace(/[^\d,.-]/g, '').replace(',', '.');
    const numericValue = parseFloat(cleanValue);
    return isNaN(numericValue) ? 0 : numericValue;
  }

  private ensureNumericValue(value: number | null | undefined): number {
    if (value === null || value === undefined || isNaN(value)) {
      return 0;
    }
    return value;
  }
} 