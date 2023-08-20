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
import { exportType } from './comps/toolbar-buttons/model/toolbar-button.model';
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
import { v4 as uuidv4 } from 'uuid';
import { isArray } from 'lodash-es';
import { TableSettingsHandler } from './helpers/table-settings-handler';
import { TableDataFetcher } from './helpers/table-data-fetcher';

@Component({
  selector: 'lib-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent<TData> implements OnInit {
  @Input() inferType?: TData;

  @Input() firstColumnFrozen?: boolean;

  @Input() export?: boolean;

  @Input() globalSearch?: boolean;

  @Input({ required: true }) tableId!: string;

  @Input() title?: string;

  @Input() showAddButton?: boolean;

  @Input() scrollHeight: number | 'auto' = 'auto';

  @Input() emptyMessage!: string;

  @Input() selectionPageOnly = false;

  @Input() rowHover = true;

  setItemsEmpty = false;

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

  @Input() selectionMode: 'single' | 'multiple' | undefined = undefined;

  @Input() selectedItems: TData[] = [];

  @Input() rowExpand = false;

  @Input() globalFilterFields: string[] = [];

  @Input() customSort = false;

  @Input() rowsSelectionDisabled = false;

  private _rowsPerPage = 10;

  @Input() set rowsPerPage(value: number) {
    this._rowsPerPage = value;
    this.rowsPerPageOptions.find((size) => size === value) ||
      this.rowsPerPageOptions.push(value);

    // sort array in ascending order
    this.rowsPerPageOptions.sort((a, b) => a - b);
  }

  get rowsPerPage(): number {
    return this._rowsPerPage;
  }

  @Input() paginator = true;

  @Input() responsiveLayoutBreakpoint: number = 768;

  @Input() currentPageReportTemplate!: string;

  @Input() rowsPerPageOptions = [10, 20, 50];

  @Input() set size(value: Size) {
    this._selectedSize = this.sizes.find((size) => size.name === value)!;
  }

  @Input() showCaption = true;
  @Input() showSummary = true;

  @Input() rowExpansionTemplate!: TemplateRef<any>;

  @Input() exportTypes: exportType[] = ['pdf', 'excel', 'csv'];

  @Input() exportFileName!: string;

  // callback functions

  @Input() customSortFn?: (event: SortEvent) => number;

  @Input() modifyConfigFn?: (config: TableViewConfig) => TableViewConfig;
  @Input() transformDataFn?: (data: any[]) => any[];

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

  constructor(
    private primengConfig: PrimeNGConfig,
    private tableConfigService: TableConfigService,
    private textService: TextService,
    @Inject('environment') public environment: any,
    private fakeRestService: FakeRequestService,
    private realRequestService: RequestService
  ) {}

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
        this.tableViewConfig = this.getTableConfig(tableConfigResp);
        this.tableSettings = this.tableViewConfig.settings;
        this.tableColumns = this.tableViewConfig.columns;

        console.info('Table configuration:', this.tableViewConfig);

        this.tableInit();
      }
    });
  }

  private tableInit() {
    const settingsHandler = new TableSettingsHandler<TData>(this);
    settingsHandler.handleManualSettings();

    this.setColumnsForExport();

    const tableDataFetcher = new TableDataFetcher<TData>(this);
    tableDataFetcher.fetchTableRows();
  }

  private setData(data: any[], total: number) {
    this.totalRows = total;

    this.items =
      this.tableSettings.transformData && this.transformDataFn
        ? this.transformDataFn(data)
        : data;

    this.setUniqueKeyForTableItems(this.items);
  }

  private setUniqueKeyForTableItems(items: any[]) {
    items.map((item) => {
      item[this.dataKey] = uuidv4();
    });
  }

  private getTableConfig(tableConfigResp: TableViewConfig) {
    if (tableConfigResp.settings.modifyConfig && this.modifyConfigFn) {
      tableConfigResp = this.modifyConfigFn(tableConfigResp);
    }
    return tableConfigResp;
  }

  private setColumnsForExport() {
    this.pushTableColumnsHeaderIdToGeneralTexts(
      this.getHandleAfterTranslationSuccess()
    );

    this.exportColumns = this.tableColumns.map((col) => ({
      title: col.header!,
      dataKey: col.field,
    }));
  }

  private getHandleAfterTranslationSuccess() {
    return () => {
      if (!this.title && this.tableSettings.title) {
        this.title = this.generalTexts[
          toCamelCase(this.tableSettings.title)
        ].label;
      }

      this.tableColumns.map((col) => {
        col.header = this.getTranslationFromLabelId(col.headerId!);
        if (col.globalSearch) {
          this.addFieldToGlobalFilterFields(col);
        }
      });
    };
  }

  getTranslationFromLabelId(labelId?: string) {
    return labelId ? this.generalTexts[toCamelCase(labelId)].label : '';
  }

  private addFieldToGlobalFilterFields(col: TableColumn) {
    if (!this.globalFilterFields.find((field) => field === col.field)) {
      this.globalFilterFields.push(col.field);
    }
  }

  private pushTableColumnsHeaderIdToGeneralTexts(
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
      if (!this.emptyMessage) {
        this.emptyMessage = this.generalTexts['defaultEmptyMessage'].label!;
      }
      success();
    });
  }

  isRowSelectable() {
    return !this.rowsSelectionDisabled;
  }

  getCustomSortFn(event: SortEvent) {
    if (this.customSortFn) this.customSortFn(event);
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

  getElement($event: Event): HTMLInputElement {
    return $event.target as HTMLInputElement;
  }

  getReportTemplateString(): string {
    return (
      this.currentPageReportTemplate ||
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
    if (this.rowExpand) {
      colspan++;
    }

    if (this.selectionMode !== undefined) {
      colspan++;
    }

    return colspan;
  }
}
