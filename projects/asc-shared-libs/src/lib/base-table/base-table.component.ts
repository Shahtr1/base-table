import { Component, Input } from '@angular/core';
import { Size } from '../model/base-table.model';

@Component({
  selector: 'lib-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.css'],
})
export class BaseTableComponent {
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
}
