import { NgModule } from '@angular/core';
import { AscSharedLibsComponent } from './asc-shared-libs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseTableComponent } from './base-table/base-table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarButtonsComponent } from './base-table/comps/toolbar-buttons/toolbar-buttons.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { CheckboxModule } from 'primeng/checkbox';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AscSharedLibsComponent,
    BaseTableComponent,
    ToolbarButtonsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    ToolbarModule,
    FileUploadModule,
    TooltipModule,
    SpeedDialModule,
    CheckboxModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 40 }),
  ],
  exports: [AscSharedLibsComponent, BaseTableComponent],
})
export class AscSharedLibsModule {}
