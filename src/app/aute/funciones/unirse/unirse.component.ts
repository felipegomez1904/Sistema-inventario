import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hasEmailError, isRequired, hasPasswordLengthError } from '../../utils/validators';
import { AuteService } from '../../data-acc/aute.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

// Interfaz para el formulario
interface FormUnirse {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-unirse',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './unirse.component.html',
  styles: ``,
})
export default class UnirseComponent {
  private _formbuilder = inject(FormBuilder);
  private _auteservice = inject(AuteService);
  private _router = inject(Router);

  // Definimos el formulario con el FormBuilder y los tipos correctos
  form: FormGroup<FormUnirse> = this._formbuilder.group({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
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
      await this._auteservice.unirse({ email, password });
      toast.success('Usuario creado correctamente');
      
      this._router.navigateByUrl('/tareas/lista-tareas');
    } catch (error: any) {
      toast.error('ocurrio un error');
    }
  }
  async submitWithGoogle() {
    try {
      await this._auteservice.singInWithGoogle();
      toast.success('Bienvenido');
      this._router.navigateByUrl('/tareas/lista-tareas');
    } catch (error: any) {
      toast.error('ocurrio un error');
    }
  }
}