import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Size } from '../model/base-table.model';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'lib-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent implements OnInit {
  @Output() onSelectedRowsChange = new EventEmitter<any[]>();

  @Input() selectionMode: 'single' | 'multiple' = 'multiple';

  @Input() selectedItems: any[] | any = [];

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

  @Input() responsiveLayoutBreakPoint: number = 768;

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

  items: { code: string; category: string }[] = [
    { code: '1', category: 'New' },
    { code: '2', category: 'Old' },
    { code: '3', category: 'New' },
    { code: '4', category: 'Old' },
    { code: '5', category: 'New' },
    { code: '6', category: 'Old' },
    { code: '7', category: 'New' },
    { code: '8', category: 'Old' },
    { code: '9', category: 'New' },
    { code: '10', category: 'Old' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.columnWidth = 100 / 2;
  }

  isRowSelectable() {
    return !this.rowsSelectionDisabled;
  }

  getCustomSortFn(event: SortEvent) {
    if (this.customSortFn) this.customSortFn(event);
  }
}
