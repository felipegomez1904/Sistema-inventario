import { Component, inject } from '@angular/core';
import { GruasService } from 'src/app/shared/gruas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importar FormBuilder y FormGroup
import { ReactiveFormsModule } from '@angular/forms'; // Importar FormsModule aquí
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { toast } from 'ngx-sonner';
import { CalendarModule } from 'primeng/calendar';
import { Router } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-gruas',
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule, DropdownModule, CalendarModule, InputTextareaModule], // Aquí se incluye FormsModule para habilitar ngForm y ngModel
  templateUrl: './gruas.component.html',
  styleUrls: ['./gruas.component.scss'],
  providers: [GruasService]
})
export class GruasComponent {

  gruasForm: FormGroup; 
  coment: boolean = false;

  gruasService: GruasService = inject(GruasService);

  estado: any[] = [
    { label: 'operativa' },
    { label: 'mantenimiento' },
    { label: 'fuera de servicio' }

  ]
  constructor(private fb: FormBuilder, private router: Router) {
    this.gruasForm = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      marca: this.fb.control('', [Validators.required]),
      modelo: this.fb.control('', [Validators.required]),
      placa: this.fb.control('', [Validators.required]),
      estado: this.fb.control('', [Validators.required]),
      fecha_de_compra: this.fb.control('', [Validators.required]),
      ubicacion: this.fb.control('', [Validators.required]),
      comentario: this.fb.control('',) 
    });
  }
  ngOnInit(){
    
  }
  loadComent(){
    console.log(this.gruasForm.controls['estado'].value.label == 'mantenimiento' || this.gruasForm.controls['estado'].value.label == 'fuera de servicio')
    if(this.gruasForm.controls['estado'].value.label == 'mantenimiento' || this.gruasForm.controls['estado'].value.label == 'fuera de servicio') {
      this.coment = true
    } else{
      this.coment = false
    }
  }
  onSubmit() {
    if (this.gruasForm.valid) {
      const newGrua = this.gruasForm.value;
      this.gruasService.addGrua(newGrua).subscribe({
        next: data => {
          toast.success('Registro Guardado');
          this.router.navigate(['/list-grua'])
        }
      })
    } else {
      console.log('Formulario no válido');
    }
  }
  goBack(){
    this.router.navigate(['/list-grua'])
  }
}
