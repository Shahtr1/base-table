import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AscSharedLibsModule } from 'asc-shared-libs';
import { Table, TableModule, TableService } from 'primeng/table';
import { environment } from '../environments/environment.development';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AscSharedLibsModule, TableModule],
  providers: [
    { provide: 'environment', useValue: environment },
    Table,
    TableService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
