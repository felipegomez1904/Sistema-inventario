import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { Grua, GruasService } from 'src/app/shared/gruas.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-gruas-vista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, CalendarModule],
  templateUrl: './gruas-vista.component.html',
  styleUrl: './gruas-vista.component.scss',
  providers: [GruasService],
})
export class GruasVistaComponent {
  gruas: any[] = [];
  isEditing: boolean = false;
  editingId: string | null = null;
  gruasForm!: FormGroup;

  estado: any[] = [
    { label: 'operativa' },
    { label: 'mantenimiento' },
    { label: 'fuera de servicio' },
  ];

  gruasService: GruasService = inject(GruasService);

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.gruasService.getData().subscribe({
      next: (grua) => {
        this.gruas = grua;
      },
    });
  }

  openForm(gr: any) {
    this.isEditing = true;
    this.gruasForm = this.fb.group({
      ids: [gr.ids],
      id: [gr.id],
      marca: [gr.marca, Validators.required],
      modelo: [gr.modelo, Validators.required],
      placa: [gr.placa, Validators.required],
      estado: [gr.estado, Validators.required],
      fecha_de_compra: [gr.fecha_de_compra, Validators.required],
      ubicacion: [gr.ubicacion, Validators.required],
      comentario: [gr.comentario],
    });
  }

  newGrua() {
    this.router.navigate(['/gruas']);
  }

  goBack() {
    this.router.navigate(['/tareas']);
  }

  saveGrua(): void {
    if (this.gruasForm.invalid) return; 

    const gruaData: any = this.gruasForm.getRawValue();
    this.gruasService.updateGrua(gruaData.ids, gruaData);

    this.gruasForm.reset();
    this.isEditing = false; 
    this.editingId = null; 
    this.loadData();
  }
  deleteGrua(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta grúa?')) {
      this.gruasService.deleteGrua(id);
      this.loadData();
    }
  }

  exportarTabla() {
    const doc = new jsPDF();

    const title = 'Listado de Grúas';
    const headers = [
      ['ID', 'Marca', 'Modelo', 'Placa', 'Estado', 'Fecha de Compra', 'Ubicación'],
    ];

    
    const data = this.gruas.map((grua) => [
      grua.id,
      grua.marca,
      grua.modelo,
      grua.placa,
      grua.estado.label,
      new Date(
        grua.fecha_de_compra.seconds * 1000 + grua.fecha_de_compra.nanoseconds / 1000000
      ).toLocaleDateString(),
      grua.ubicacion,
    ]);

    doc.setFontSize(14);
    doc.text(title, 14, 15);
    (doc as any).autoTable({
      head: headers,
      body: data,
      startY: 20,
    });

    doc.save('listado_gruas.pdf');
  }
}

