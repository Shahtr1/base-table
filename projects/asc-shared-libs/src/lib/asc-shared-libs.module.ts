import { NgModule } from '@angular/core';
import { AscSharedLibsComponent } from './asc-shared-libs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseTableComponent } from './base-table/base-table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [AscSharedLibsComponent, BaseTableComponent],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
  ],
  exports: [AscSharedLibsComponent, BaseTableComponent],
})
export class AscSharedLibsModule {}
