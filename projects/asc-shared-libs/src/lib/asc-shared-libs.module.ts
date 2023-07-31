import { NgModule } from '@angular/core';
import { AscSharedLibsComponent } from './asc-shared-libs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseTableComponent } from './base-table/base-table.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [AscSharedLibsComponent, BaseTableComponent],
  imports: [ReactiveFormsModule, BrowserAnimationsModule, TableModule],
  exports: [AscSharedLibsComponent, BaseTableComponent],
})
export class AscSharedLibsModule {}
