import { AbstractControl, FormGroup } from '@angular/forms';

export function isRequired(field: string, form: FormGroup): boolean {
  const control = form.get(field);
  return control ? control.hasError('required') && control.touched : false;
}

export function hasEmailError(control: AbstractControl): boolean {
  return control.hasError('email') && control.touched;
}

export function hasPasswordLengthError(control: AbstractControl): boolean {
  return control.hasError('minlength') && control.touched;
}