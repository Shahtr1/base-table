import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Size } from '../model/base-table.model';
import { SortEvent } from 'primeng/api';
import { ColumnFilterFormElement } from 'primeng/table';

@Component({
  selector: 'lib-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.css'],
})
export class BaseTableComponent {
  @Input() sort = true;

  @Input() customSort = false;

  @Input() customSortFn?: (event: SortEvent) => number;

  private _rowSize = 10;

  @Input() set rowSize(value: number) {
    this._rowSize = value;
    this.rowsPerPageOptions.find((size) => size === value) ||
      this.rowsPerPageOptions.push(value);
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

  products: { code: string; category: string }[] = [
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

  getCustomSortFn(event: SortEvent) {
    if (this.customSortFn) this.customSortFn(event);
  }
}
