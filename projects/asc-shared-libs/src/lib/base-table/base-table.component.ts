import { Component, Input } from '@angular/core';
import { Size } from '../model/base-table.model';

@Component({
  selector: 'lib-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.css'],
})
export class BaseTableComponent {
  @Input() set size(value: Size) {
    this.selectedSize = this.sizes.find((size) => size.name === value)!;
  }

  private sizes: { name: Size; class: string }[] = [
    { name: 'small', class: 'p-datatable-sm' },
    { name: 'normal', class: '' },
    { name: 'large', class: 'p-datatable-lg' },
  ];

  // set default size to normal
  selectedSize: { name: Size; class: string } = this.sizes[1];

  products: { code: string; category: string }[] = [
    {
      code: '1',
      category: 'New',
    },
    {
      code: '2',
      category: 'Old',
    },
  ];
}
