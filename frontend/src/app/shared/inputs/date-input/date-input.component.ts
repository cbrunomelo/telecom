import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent extends BaseInputComponent implements ControlValueAccessor {
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() disabled = false;
  @Input() placeholder = 'dd/mm/aaaa';

  value: any = '';
  displayValue: string = '';
  
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    super();
    this.control = new FormControl('');
  }

  writeValue(value: string): void {
    if (value !== undefined) {
      this.value = value;
      this.displayValue = this.formatDate(value);
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: string) => void): void {
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
    this.value = value;
    this.displayValue = this.formatDate(value);
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  private formatDate(date: string): string {
    if (!date) return '';
    try {
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    } catch {
      return date;
    }
  }
} 