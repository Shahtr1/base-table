import { Component } from '@angular/core';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedItems = [{ code: '2', category: 'Old' }];
  customSortFn: (event: SortEvent) => number = (event: SortEvent) => {
    console.log('event', event);
    return 1;
  };

  onRowUnselect(data: any) {
    console.log('onRowUnselect', data);
  }

  onRowSelect(data: any) {
    console.log('onRowSelect', data);
  }
}
