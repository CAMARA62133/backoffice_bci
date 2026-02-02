import { AbstractControl, ValidationErrors } from '@angular/forms';

export function boolean01Validator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return value === 0 || value === 1 || value === '0' || value === '1' ? null : { boolean01: true };
}
