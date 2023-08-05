import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ExportColumn } from '../../model/base-table.model';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { exportType } from './model/toolbar-button.model';
import { TextService } from '../../../services/text.service';
import { GeneralText } from '../../../model/lib.model';

@Component({
  selector: 'lib-toolbar-buttons',
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.scss'],
})
export class ToolbarButtonsComponent<TData> implements OnInit {
  menuItems: MenuItem[] = [
    {
      id: 'csv',
      icon: 'pi pi-file',
      tooltipOptions: {
        tooltipPosition: 'left',
        tooltipLabel: 'CSV',
      },
      command: () => {
        this.table.exportCSV({
          selectionOnly:
            this.selectAll.getRawValue() && this.selectedItems.length > 0,
        });
      },
    },
    {
      id: 'excel',
      icon: 'pi pi-file-excel',
      tooltipOptions: {
        tooltipPosition: 'left',
        tooltipLabel: 'Excel',
      },
      command: () => {
        this.exportExcel();
      },
    },
    {
      id: 'pdf',
      icon: 'pi pi-file-pdf',
      tooltipOptions: {
        tooltipPosition: 'left',
        tooltipLabel: 'PDF',
      },

      command: () => {
        this.exportPdf();
      },
    },
  ];

  @Input() showAddButton = true;

  @Input() exportTypes: exportType[] = ['pdf', 'excel', 'csv'];

  @Input({ required: true }) items: TData[] = [];

  @Input({ required: true }) selectedItems: TData[] = [];

  @Input({ required: true }) exportColumns: ExportColumn[] = [];

  @Input() exportFileName = 'items';

  @Input({ required: true }) table!: Table;

  selectAll = new FormControl<boolean>(false);

  generalTexts: GeneralText = {
    new: { labelId: 'L_NEW' },
    newToolTip: { labelId: 'L_NEW_TOOLTIP' },
    deleteAllSelected: { labelId: 'L_DELETE_ALL_SELECTED' },
    export: { labelId: 'L_EXPORT' },
    selectedOnly: { labelId: 'L_SELECTED_ONLY' },
  };

  constructor(textService: TextService) {
    textService.convert(this.generalTexts).subscribe((texts) => {
      this.generalTexts = { ...texts };
    });
  }

  ngOnInit(): void {
    this.filterMenuItems();
  }

  private filterMenuItems() {
    this.menuItems = this.menuItems.filter((x) =>
      this.exportTypes.includes(x.id as exportType)
    );
  }

  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(
          this.exportColumns,
          this.selectAll.getRawValue() && this.selectedItems.length > 0
            ? this.selectedItems
            : this.items
        );
        doc.save(`${this.exportFileName}.pdf`);
      });
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        this.selectAll.getRawValue() && this.selectedItems.length > 0
          ? this.selectedItems
          : this.items
      );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, this.exportFileName);
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

  deleteSelectedRows() {}

  addNew() {}
}
