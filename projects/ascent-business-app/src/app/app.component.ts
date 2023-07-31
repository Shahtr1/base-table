import { Component } from '@angular/core';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  customSortFn: (event: SortEvent) => number = (event: SortEvent) => {
    console.log('event', event);
    return 1;
  };
}
