import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ExportarPdfService } from 'src/app/shared/export.service';
import { EquiposService } from 'src/app/shared/equipos.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipos-vista',
  standalone: true,
  templateUrl: './equipos-vista.component.html',
  styleUrls: ['./equipos-vista.component.scss'],
  providers: [EquiposService],
  imports: [ReactiveFormsModule, DropdownModule, CommonModule],
})
export class EquiposVistaComponent {
  equipos: any[] = [];
  isEditing: boolean = false;
  equiposForm!: FormGroup;

  tipos: any[] = [
    { label: 'Laptop' },
    { label: 'Impresora' },
    { label: 'Monitor' },
  ];

  equiposService: EquiposService = inject(EquiposService);

  constructor(
    private exportarPdfService: ExportarPdfService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.equiposService.getData().subscribe({
      next: (equipo) => {
        this.equipos = equipo;
      },
    });
  }

  exportarTabla() {
    const titulo = 'Inventario de Equipos Electrónicos';
    const cabeceras = ['ID', 'Tipo', 'Marca', 'Comentarios'];
    const datos = this.equipos.map((equipo) => [
      equipo.id,
      equipo.tipo.label,
      equipo.marca,
      equipo.comentarios,
    ]);

    this.exportarPdfService.exportarPDF(titulo, cabeceras, datos);
  }

  openForm(equipo: any) {
    this.isEditing = true;
    this.equiposForm = this.fb.group({
      ids: [equipo.ids],
      id: [equipo.id],
      tipo: [equipo.tipo, Validators.required],
      marca: [equipo.marca, Validators.required],
      comentarios: [equipo.comentarios],
    });
  }

  newEquipo() {
    this.router.navigate(['/equipos']);
  }

  goBack() {
    this.router.navigate(['/tareas']);
  }

  saveEquipo(): void {

    const equipoData: any = this.equiposForm.getRawValue();
    console.log(equipoData)
    this.equiposService.updateEquipo(equipoData.ids, equipoData);
    this.isEditing = false;
    this.loadData();
  }

  deleteEquipo(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este equipo?')) {
      this.equiposService.deleteEquipo(id);
      this.loadData();
    }
  }
}
