import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class ExportarPdfService {
  constructor() {}

  exportarPDF(titulo: string, cabeceras: string[], datos: any[]) {
    const doc = new jsPDF();

    
    doc.setFontSize(18);
    doc.text(titulo, 14, 20);

    
    autoTable(doc, {
      head: [cabeceras],
      body: datos,
      startY: 30,
    });

    
    doc.save(`${titulo}.pdf`);
  }
}
