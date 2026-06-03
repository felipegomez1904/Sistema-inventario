import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MantenimientoService } from 'src/app/shared/mantenimiento.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-mantenimiento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.scss'],
  providers: [MantenimientoService],
})
export class MantenimientoComponent implements OnInit {
  gruas: any[] = [];
  isEditing: boolean = false;
  editingGrua: any = null;
  mantenimientoForm!: FormGroup;
  mantenimientoService: MantenimientoService = inject(MantenimientoService);

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loadMaintenanceGruas();

    this.mantenimientoForm = this.fb.group({
      descripcion: ['', Validators.required], // Se requiere la descripción
    });
  }

  async loadMaintenanceGruas() {
    this.gruas = await this.mantenimientoService.getMaintenanceGruas();
    console.log(this.gruas);
  }

  editGrua(grua: any) {
    this.isEditing = true;
    this.editingGrua = grua;
    this.mantenimientoForm.setValue({
      descripcion: '',
    });
  }

  async saveChanges() {
    if (this.mantenimientoForm.invalid) return;

    const descripcion = this.mantenimientoForm.value.descripcion;
    console.log(this.editingGrua);
    this.mantenimientoService.updateGruaState(this.editingGrua.ids, descripcion).subscribe({
      next: (data) => {
        this.gruas = this.gruas.filter((grua) => grua.id !== this.editingGrua.id);
        this.isEditing = false;
        this.editingGrua = null;
      },
    });
  }

  goBack() {
    this.router.navigate(['/tareas']);
  }

  exportarTabla() {
    const doc = new jsPDF();

    // Títulos y encabezados de las columnas
    const title = 'Listado de Grúas en Mantenimiento';
    const headers = [['ID', 'Marca', 'Modelo', 'Estado', 'Comentario']];

    // Datos para el cuerpo de la tabla
    const data = this.gruas.map((grua) => [
      grua.id,
      grua.marca,
      grua.modelo,
      grua.estado.label,
      grua.comentario || 'N/A',
    ]);

    // Configuración del PDF
    doc.setFontSize(14);
    doc.text(title, 14, 15);
    (doc as any).autoTable({
      head: headers,
      body: data,
      startY: 20,
    });

    // Guardar el archivo PDF
    doc.save('gruas_mantenimiento.pdf');
  }
}
