import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';

type SubProduct = {
  code: string;
  category: string;
};

type Product = {
  code: string;
  category: string;
  subProducts: SubProduct[];
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  items: Product[] = [];

  selectedItems: Product[] = [];

  ngOnInit() {
    this.addDummyProducts();
  }

  private addDummyProducts() {
    for (let i = 0; i < 100; i++) {
      this.items.push({
        code: i.toString(),
        category: 'category ' + i,
        subProducts: [
          {
            code: 'sub A ' + i,
            category: 'sub category A ' + i,
          },
          {
            code: 'sub B ' + i,
            category: 'sub category B ' + i,
          },
        ],
      });
    }

    this.selectedItems.push(this.items.find((item) => item.code === '3')!);
  }

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
