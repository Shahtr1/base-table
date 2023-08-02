import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { Size } from '../model/base-table.model';
import { PrimeNGConfig, SortEvent } from 'primeng/api';
import { TableRowSelectEvent } from 'primeng/table';
import { Column, ExportColumn } from './model/base-table.model';
import { exportType } from './comps/toolbar-buttons/model/toolbar-button.model';

@Component({
  selector: 'lib-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent<TData> implements OnInit {
  cols!: Column[];

  exportColumns!: ExportColumn[];

  @Input() scrollHeight: number | 'auto' = 'auto';

  @Input() emptyMessage = 'No records found';

  @Input() selectionPageOnly = true;

  @Input() rowHover = true;

  @Input() items: TData[] = [];

  @Output() selectedItemsChange = new EventEmitter<TData[]>();

  @Output() onTableRowSelect = new EventEmitter<TData>();

  @Output() onTableRowUnselect = new EventEmitter<TData>();

  @Input() selectionMode: 'single' | 'multiple' | undefined = undefined;

  @Input() selectedItems: TData[] = [];

  @Input() rowExpand = false;

  public columnWidth = 0;

  @Input() dataKey = 'id';

  @Input() globalFilterFields: string[] = [];

  @Input() sort = true;

  @Input() customSort = false;

  @Input() customSortFn?: (event: SortEvent) => number;

  @Input() rowsSelectionDisabled = false;

  private _rowSize = 10;

  @Input() set rowSize(value: number) {
    this._rowSize = value;
    this.rowsPerPageOptions.find((size) => size === value) ||
      this.rowsPerPageOptions.push(value);

    // sort array in ascending order
    this.rowsPerPageOptions.sort((a, b) => a - b);
  }

  get rowSize(): number {
    return this._rowSize;
  }

  @Input() paginator = true;

  @Input() responsiveLayoutBreakpoint: number = 768;

  @Input() currentPageReportTemplate =
    'Showing {first} to {last} of {totalRecords} entries';

  @Input() rowsPerPageOptions = [10, 20, 50];

  @Input() set size(value: Size) {
    this._selectedSize = this.sizes.find((size) => size.name === value)!;
  }

  private sizes: { name: Size; class: string }[] = [
    { name: 'small', class: 'p-datatable-sm' },
    { name: 'normal', class: '' },
    { name: 'large', class: 'p-datatable-lg' },
  ];

  // set default size to normal
  private _selectedSize: { name: Size; class: string } = this.sizes[1];

  get selectedSize(): { name: Size; class: string } {
    return this._selectedSize;
  }

  @Input() showCaption = true;
  @Input() showSummary = true;

  @Input() rowExpansionTemplate!: TemplateRef<any>;

  @Input() exportTypes: exportType[] = ['pdf', 'excel', 'csv'];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.columnWidth = 100 / 2;

    this.primengConfig.ripple = true;

    this.cols = [
      { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
      { field: 'category', header: 'Category' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  isRowSelectable() {
    return !this.rowsSelectionDisabled;
  }

  getCustomSortFn(event: SortEvent) {
    if (this.customSortFn) this.customSortFn(event);
  }

  onRowSelect(event: TableRowSelectEvent) {
    this.selectedItemsChange.emit(this.selectedItems);
    this.onTableRowSelect.emit(event.data as TData);
  }

  onRowUnselect(event: TableRowSelectEvent) {
    this.selectedItemsChange.emit(this.selectedItems);
    this.onTableRowUnselect.emit(event.data as TData);
  }

  selectAll(data: Event) {
    this.selectedItemsChange.emit(this.selectedItems);
  }

  protected readonly undefined = undefined;
}
