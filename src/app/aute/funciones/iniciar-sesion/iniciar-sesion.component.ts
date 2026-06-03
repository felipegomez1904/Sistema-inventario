import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  NonNullableFormBuilder
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { AuteService } from '../../data-acc/aute.service';
import { isRequired, hasEmailError, hasPasswordLengthError } from '../../utils/validators';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';


interface forminiciarsesion {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './iniciar-sesion.component.html',
})
export default class IniciarSesionComponent {
  private _formbuilder = inject(NonNullableFormBuilder); // Usa NonNullableFormBuilder para evitar null
  private _auteservice = inject(AuteService);
  private _router = inject(Router);

  form: FormGroup<forminiciarsesion> = this._formbuilder.group({
    email: this._formbuilder.control('', [Validators.required, Validators.email]),
    password: this._formbuilder.control('', [Validators.required, Validators.minLength(8)]),
  });

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form.get('email')!);
  }

  hasPasswordLengthError() {
    return hasPasswordLengthError(this.form.get('password')!);
  }

  async submit() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.getRawValue();
      await this._auteservice.iniciarsesion({ email, password });
      this._router.navigateByUrl('/tareas');
      toast.success('Bienvenido');
      
    } catch (error) {
      toast.error('Ocurrió un error');
    }
  }

  async submitWithGoogle(){
    try {
      await this._auteservice.singInWithGoogle();
      this._router.navigateByUrl('/tareas');
      toast.success('Bienvenido');
    } catch (error) {
      toast.error('Ocurrió un error');
    }
  }
}

