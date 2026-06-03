import { Component, inject } from '@angular/core';
import { EquiposService } from 'src/app/shared/equipos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importar FormBuilder y FormGroup
import { ReactiveFormsModule } from '@angular/forms'; // Importar FormsModule aquí
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DropdownModule], // Se eliminó CalendarModule porque no hay fecha aquí
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
  providers: [EquiposService]
})
export class EquiposComponent {

  equiposForm: FormGroup;

  equiposService: EquiposService = inject(EquiposService);

  tipo: any[] = [
    
    { label: 'Impresora' },
    { label: 'Teléfono' },
    { label: 'Tablet' },
    { label: 'Otro' }
  ];
  
  constructor(private fb: FormBuilder, private router: Router) {
    this.equiposForm = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      tipo: this.fb.control('', [Validators.required]),
      marca: this.fb.control('', [Validators.required]),
      comentarios: this.fb.control(''),
    });
  }
  onSubmit() {
    if (this.equiposForm.valid) {
      const newEquipo = this.equiposForm.value;
      this.equiposService.addEquipo(newEquipo).subscribe({
        next: () => {
          toast.success('Registro Guardado');
          this.router.navigate(['/list-equipo']);
        },
        error: (err) => {
          console.error('Error al guardar equipo:', err);
          toast.error('Error al guardar el registro');
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  goBack() {
    this.router.navigate(['/list-equipo']);
  }
}

