import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent } from '../base-input/base-input.component';

interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true
    }
  ]
})
export class SelectInputComponent extends BaseInputComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Selecione uma opção';
  @Input() icon?: string;
  @Input() disabled = false;

  value: any = '';
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    super();
    this.control = new FormControl('');
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: any) => void): void {
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

  handleBlur(): void {
    this.onTouched();
  }

  handleChange(value: any): void {
    this.value = value;
    this.onChange(value);
  }
} 