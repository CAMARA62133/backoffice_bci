import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  /**
   * EXCEL : Transforme un tableau d'objets en fichier .xlsx
   */
  exportToExcel(data: any[], fileName: string): void {
    if (!data || data.length === 0) return;

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Données');

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  /**
   * PDF : Génère un tableau à partir d'entêtes et d'un corps de texte
   */
  exportToPdf(
    title: string,
    head: string[][],
    body: any[][],
    fileName: string,
  ): void {
    const doc = new jsPDF('l', 'mm', 'a4'); // 'l' pour paysage (Landscape)

    doc.setFontSize(16);
    doc.text(title, 14, 15);

    autoTable(doc, {
      startY: 25,
      head: head,
      body: body,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    const blobUrl = doc.output('bloburl');
    window.open(blobUrl as unknown as string, '_blank');
  }
}
