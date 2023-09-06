import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AscSharedLibsModule } from 'asc-shared-libs';
import { Table, TableModule, TableService } from 'primeng/table';
import { environment } from '../environments/environment.development';
import {PageSizeInterceptor} from "../../../asc-shared-libs/src/lib/interceptors/page-size.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AscSharedLibsModule, TableModule],
  providers: [
    { provide: 'environment', useValue: environment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PageSizeInterceptor,
      multi: true,
    },
    Table,
    TableService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
