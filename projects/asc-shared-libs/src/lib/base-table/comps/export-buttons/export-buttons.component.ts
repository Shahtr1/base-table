import { Component, Input } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ExportColumn } from '../../model/base-table.model';
import { Table } from 'primeng/table';

@Component({
  selector: 'lib-export-buttons',
  templateUrl: './export-buttons.component.html',
  styleUrls: ['./export-buttons.component.scss'],
})
export class ExportButtonsComponent<TData> {
  @Input({ required: true }) items: TData[] = [];
  @Input({ required: true }) exportColumns: ExportColumn[] = [];

  @Input({ required: true }) table!: Table;

  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.items);
        doc.save('products.pdf');
      });
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.items);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
