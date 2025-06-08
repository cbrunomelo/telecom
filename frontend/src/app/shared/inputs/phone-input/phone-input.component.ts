import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="input-container">
      <label *ngIf="label">{{ label }}</label>
      <div class="input-wrapper">
        <input
          type="tel"
          [id]="label"
          [formControl]="control"
          [required]="required"
          (input)="formatPhoneNumber($event)"
          placeholder="0800 000 0000"
          [class.is-invalid]="errorMessage"
        />
        <i class="fa-solid fa-phone input-icon"></i>
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
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      font-size: 1rem;
      line-height: 1.5;
      color: #495057;
      background-color: #f8f9fa;
      border: 1px solid #ced4da;
      border-radius: 0.5rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

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
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    }
  ]
})
export class PhoneInputComponent extends BaseInputComponent implements ControlValueAccessor {
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    super();
    this.control = new FormControl('');
  }

  writeValue(value: string): void {
    if (value !== undefined) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
    this.control.valueChanges.subscribe(value => {
      if (value !== null) {
        this.onChange(value);
      }
    });
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
    this.control.valueChanges.subscribe(() => {
      this.onTouched();
    });
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  formatPhoneNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('0800')) {
      if (value.length > 11) value = value.substring(0, 11);
      if (value.length > 7) {
        value = value.substring(0, 4) + ' ' + 
                value.substring(4, 7) + ' ' + 
                value.substring(7);
      } else if (value.length > 4) {
        value = value.substring(0, 4) + ' ' + 
                value.substring(4);
      }
    } else {
      if (value.length > 11) value = value.substring(0, 11);
      if (value.length > 7) {
        value = '(' + value.substring(0, 2) + ') ' +
                value.substring(2, 7) + '-' +
                value.substring(7);
      } else if (value.length > 2) {
        value = '(' + value.substring(0, 2) + ') ' +
                value.substring(2);
      }
    }
    
    this.control.setValue(value, { emitEvent: true });
  }
} 