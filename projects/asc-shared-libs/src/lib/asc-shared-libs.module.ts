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
import { ToolbarButtonsComponent } from './base-table/comps/toolbar-buttons/toolbar-buttons.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { CheckboxModule } from 'primeng/checkbox';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { LabelState } from './store/state/label.state';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { GetLanguages } from './store/actions/language.action';
import { LanguageState } from './store/state/language.state';
import { noop, switchMap, take } from 'rxjs';
import { GetLabels } from './store/actions/label.action';

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
    NgxsModule.forRoot([LabelState, LanguageState]),
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
    console.info('Dispatching languages...');
    this.store.dispatch(new GetLanguages());

    this.getLabelsDispatcher$().subscribe(noop);
  }

  private getLabelsDispatcher$() {
    return this.store
      .select((state) => state.languages.languages)
      .pipe(
        // Wait until you have received the languages response
        take(1),
        // Use switchMap to trigger the GetLabels action
        switchMap((languages) => {
          if (languages) {
            // Dispatch the GetLabels action after receiving languages
            console.info('Dispatching labels...');
            return this.store.dispatch(new GetLabels());
          } else {
            return [];
          }
        }),
      );
  }
}
