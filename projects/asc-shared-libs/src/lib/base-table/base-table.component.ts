import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PrimeNGConfig, SortEvent } from 'primeng/api';
import { Table, TableRowSelectEvent } from 'primeng/table';
import { ExportColumn, Size } from './model/base-table.model';
import { TableConfigService } from '../services/table-config.service';
import {
  TableColumn,
  TableSettings,
  TableViewConfig,
} from '../model/table-config.model';
import { TextService } from '../services/text.service';
import { GeneralText } from '../model/lib.model';
import { toCamelCase } from '../common/utils';
import { FakeRequestService } from '../services/request/fake-request.service';
import { RequestService } from '../services/request/request.service';
import { isArray } from 'lodash-es';
import { TableSettingsHandler } from './helpers/table-settings-handler';
import { TableDataFetcher } from './helpers/table-data-fetcher';
import { TableInputOptions } from './helpers/table-input-options';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'lib-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent<TData> implements OnInit {
  @Input({ required: true }) tableId!: string;

  @Input()
  inputOptions: TableInputOptions<TData> = new TableInputOptions<TData>();

  setItemsEmpty = false;

  @Input() selectedItems: TData[] = [];

  @Input() rowExpansionTemplate!: TemplateRef<any>;

  private _items: TData[] = [];

  @Input() set items(value: TData[]) {
    this._items = value;
    this.setItemsEmpty = value.length === 0;
    this.selectedItems = [];
    this.selectedItemsChange.emit(this.selectedItems);
  }
  get items(): TData[] {
    return this._items;
  }

  @Output() selectedItemsChange = new EventEmitter<TData[]>();

  @Output() onTableRowSelect = new EventEmitter<TData>();

  @Output() onTableRowUnselect = new EventEmitter<TData>();

  private _rowsPerPage = 10;

  @Input() set rowsPerPage(value: number) {
    this._rowsPerPage = value;
    this.inputOptions.rowsPerPageOptions.find((size) => size === value) ||
      this.inputOptions.rowsPerPageOptions.push(value);

    /** sort array in ascending order */
    this.inputOptions.rowsPerPageOptions.sort((a, b) => a - b);
  }

  get rowsPerPage(): number {
    return this._rowsPerPage;
  }

  @Input() set size(value: Size) {
    this._selectedSize = this.sizes.find((size) => size.name === value)!;
  }

  // callback functions

  private sizes: { name: Size; class: string }[] = [
    { name: 'small', class: 'p-datatable-sm' },
    { name: 'normal', class: '' },
    { name: 'large', class: 'p-datatable-lg' },
  ];

  // set default size to small
  private _selectedSize: { name: Size; class: string } = this.sizes[0];

  get selectedSize(): { name: Size; class: string } {
    return this._selectedSize;
  }

  @ViewChild('table') table?: Table;

  readonly dataKey = '______asc_datatable_uuid';
  private tableViewConfig!: TableViewConfig;
  tableSettings!: TableSettings;

  tableColumns: TableColumn[] = [];
  exportColumns!: ExportColumn[];

  pageNumber = 0;
  totalRows = 0;

  generalTexts: GeneralText = {
    globalSearch: { labelId: 'L_GLOBAL_SEARCH' },
    search: { labelId: 'L_SEARCH' },
    select: { labelId: 'L_SELECT' },
    multiselect: { labelId: 'L_SELECT_MULTIPLE' },
    defaultEmptyMessage: { labelId: 'L_DEFAULT_EMPTY_MESSAGE' },
    currentPageReportTemplate: { labelId: 'L_CURRENT_PAGE_REPORT_TEMPLATE' },
  };

  private tableSettingsHandler: TableSettingsHandler<TData>;
  private tableDataFetcher: TableDataFetcher<TData>;

  constructor(
    private primengConfig: PrimeNGConfig,
    private tableConfigService: TableConfigService,
    private textService: TextService,
    @Inject('environment') public environment: any,
    private fakeRestService: FakeRequestService,
    private realRequestService: RequestService
  ) {
    this.tableSettingsHandler = new TableSettingsHandler(this);
    this.tableDataFetcher = new TableDataFetcher(this);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loadTableConfig();
  }

  get requestService(): RequestService | FakeRequestService {
    return this.environment.isMockEnabled
      ? this.fakeRestService
      : this.realRequestService;
  }

  getSetting(field: any) {
    return field === undefined ? true : field!;
  }

  private loadTableConfig() {
    this.tableConfigService.load(this.tableId).subscribe((tableConfigResp) => {
      if (tableConfigResp) {
        this.tableViewConfig = this.handleTableConfig(tableConfigResp);
        this.tableSettings = this.tableViewConfig.settings;
        this.tableColumns = this.tableViewConfig.columns;

        console.info('Table configuration:', this.tableViewConfig);

        this.tableInit();
      }
    });
  }

  private tableInit() {
    this.tableSettingsHandler.handleManualSettings();

    this.setColumnsForExport__AndTranslateGeneralTexts();

    this.tableDataFetcher.fetchTableRows();
  }

  private handleTableConfig(tableConfigResp: TableViewConfig) {
    if (
      tableConfigResp.settings.modifyConfig &&
      this.inputOptions.modifyConfigFn
    ) {
      tableConfigResp = this.inputOptions.modifyConfigFn(tableConfigResp);
    }
    return tableConfigResp;
  }

  private setColumnsForExport__AndTranslateGeneralTexts() {
    this.pushTableColumnsHeaderIdToGeneralTexts__AndTranslateGeneralTexts(
      this.getHandleAfterTranslationSuccess()
    );

    this.exportColumns = this.tableColumns.map((col) => ({
      title: col.header!,
      dataKey: col.field,
    }));
  }

  private getHandleAfterTranslationSuccess() {
    return () => {
      this.setTranslatedTitle();

      this.tableColumns.map((col) => {
        col.header = this.getTranslationFromLabelId(col.headerId!);
        if (col.globalSearch) {
          this.addFieldToGlobalFilterFields(col);
        }
      });
    };
  }

  private setTranslatedTitle() {
    if (!this.inputOptions.title && this.tableSettings.title) {
      this.inputOptions.title =
        this.generalTexts[toCamelCase(this.tableSettings.title)].label;
    }
  }

  getTranslationFromLabelId(labelId?: string) {
    return labelId ? this.generalTexts[toCamelCase(labelId)].label : '';
  }

  private addFieldToGlobalFilterFields(col: TableColumn) {
    if (
      !this.inputOptions.globalFilterFields.find((field) => field === col.field)
    ) {
      this.inputOptions.globalFilterFields.push(col.field);
    }
  }

  private pushTableColumnsHeaderIdToGeneralTexts__AndTranslateGeneralTexts(
    handleAfterTranslationSuccess: () => void
  ) {
    this.tableColumns.forEach((col) => {
      if (col.headerId) {
        const key = toCamelCase(col.headerId);
        this.generalTexts[key] = { labelId: col.headerId };
      }

      if (col.input?.placeholderId) {
        const key = toCamelCase(col.input.placeholderId);
        this.generalTexts[key] = { labelId: col.input.placeholderId };
      }
    });

    this.translateGeneralTexts(handleAfterTranslationSuccess);
  }

  private translateGeneralTexts(success: () => void) {
    this.textService.convert(this.generalTexts).subscribe((res) => {
      this.generalTexts = { ...res };
      if (!this.inputOptions.emptyMessage) {
        this.inputOptions.emptyMessage =
          this.generalTexts['defaultEmptyMessage'].label!;
      }
      success();
    });
  }

  isRowSelectable() {
    return !this.inputOptions?.rowsSelectionDisabled;
  }

  getCustomSortFn(event: SortEvent) {
    if (this.inputOptions.customSortFn) this.inputOptions.customSortFn(event);
  }

  onRowSelect(event: TableRowSelectEvent) {
    this.changeObjectToArrayIfSingleModeSelection();
    this.selectedItemsChange.emit(this.selectedItems);
    this.onTableRowSelect.emit(event.data as TData);
  }

  private changeObjectToArrayIfSingleModeSelection() {
    if (!isArray(this.selectedItems)) {
      this.selectedItems = [this.selectedItems];
    }
  }

  onRowUnselect(event: TableRowSelectEvent) {
    this.changeObjectToArrayIfSingleModeSelection();
    this.selectedItemsChange.emit(this.selectedItems);
    this.onTableRowUnselect.emit(event.data as TData);
  }

  selectAll(data: Event) {
    this.changeObjectToArrayIfSingleModeSelection();
    this.selectedItemsChange.emit(this.selectedItems);
  }

  getInputElement($event: Event): HTMLInputElement {
    return $event.target as HTMLInputElement;
  }

  getReportTemplateString(): string {
    return (
      this.inputOptions.currentPageReportTemplate ||
      this.generalTexts['currentPageReportTemplate'].label!
    );
  }

  getDropdownOptions(field: string): any[] {
    return [...new Set(this.items.map((item) => (item as any)[field]))];
  }

  onRowEditInit(item: TData) {
    console.log('edit item', item);
  }

  onRowEditSave(item: TData) {
    console.log('save item', item);
  }

  onRowEditCancel(item: TData, index: number) {
    console.log('cancel item', item);
    console.log('index', index);
  }

  onRowDelete(item: TData) {
    console.log('delete item', item);
  }

  calculateEmptyMessageColspan(): number {
    let colspan = 0;

    colspan = this.tableColumns.length;
    if (this.inputOptions.rowExpand) {
      colspan++;
    }

    if (this.inputOptions.selectionMode !== undefined) {
      colspan++;
    }

    return colspan;
  }

  getTextSpanClasses(textConfig: any): string[] {
    const classes: string[] = [];

    if (textConfig?.position === 'right' && textConfig?.icon) {
      classes.push('p-input-icon-right');
    } else if (textConfig?.icon) {
      classes.push('p-input-icon-left');
    }

    return classes;
  }

  getOptionsFromUrl(url?: string): Observable<Record<string, any>[]> {
    return of([]);
  }
}
