import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-base-input',
  template: '',
  standalone: true
})
export class BaseInputComponent {
  @Input() label: string = '';
  @Input() errorMessage: string = '';
  @Input() set control(value: AbstractControl | null) {
    this._control = value as FormControl;
  }
  get control(): FormControl {
    return this._control;
  }
  private _control!: FormControl;
  @Input() required: boolean = false;
} 