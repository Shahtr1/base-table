import { Component } from '@angular/core';
import { SortEvent } from 'primeng/api';

type Product = {
  code: string;
  category: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  items: Product[] = [
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

  selectedItems: Product[] = [{ code: '2', category: 'Old' }];
  customSortFn: (event: SortEvent) => number = (event: SortEvent) => {
    console.log('event', event);
    return 1;
  };

  onRowUnselect(data: Product) {
    console.log('onRowUnselect', data);
  }

  onRowSelect(data: Product) {
    console.log('onRowSelect', data);
  }
}
