import { NgModule } from '@angular/core';
import { AscSharedLibsComponent } from './asc-shared-libs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseTableComponent } from './base-table/base-table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { SpeedDialModule } from 'primeng/speeddial';
import { CheckboxModule } from 'primeng/checkbox';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { LabelState } from './store/state/label.state';
import { GetLabels } from './store/actions/label.action';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [AscSharedLibsComponent, BaseTableComponent],
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
    NgxsModule.forRoot([LabelState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    DropdownModule,
    FormsModule,
    TagModule,
    MultiSelectModule,
  ],
  exports: [AscSharedLibsComponent, BaseTableComponent],
})
export class AscSharedLibsModule {
  constructor(private store: Store) {
    console.info('Dispatching labels...');
    this.store.dispatch(new GetLabels());
  }
}
