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

@Component({
  selector: 'lib-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent<TData> implements OnInit {
  @Input() inferType?: TData;

  @Input({ required: true }) tableId!: string;

  @Input() title?: string;

  @Input() showAddButton = true;

  @Input() scrollHeight: number | 'auto' = 'auto';

  @Input() emptyMessage!: string;

  @Input() selectionPageOnly = false;

  @Input() rowHover = true;

  @Input() items: TData[] = [];

  @Output() selectedItemsChange = new EventEmitter<TData[]>();

  @Output() onTableRowSelect = new EventEmitter<TData>();

  @Output() onTableRowUnselect = new EventEmitter<TData>();

  @Input() selectionMode: 'single' | 'multiple' | undefined = undefined;

  @Input() selectedItems: TData[] = [];

  @Input() rowExpand = false;

  public columnWidth = 0;

  @Input() dataKey = 'id';

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

  private tableViewConfig!: TableViewConfig;
  private tableSettings!: TableSettings;

  tableColumns: TableColumn[] = [];
  exportColumns!: ExportColumn[];

  pageNumber = 0;
  totalRows = 0;

  generalTexts: GeneralText = {
    globalSearch: { labelId: 'L_GLOBAL_SEARCH' },
    search: { labelId: 'L_SEARCH' },
    select: { labelId: 'L_SELECT' },
    selectMultiple: { labelId: 'L_SELECT_MULTIPLE' },
    defaultEmptyMessage: { labelId: 'L_DEFAULT_EMPTY_MESSAGE' },
    currentPageReportTemplate: { labelId: 'L_CURRENT_PAGE_REPORT_TEMPLATE' },
  };

  constructor(
    private primengConfig: PrimeNGConfig,
    private tableConfigService: TableConfigService,
    private textService: TextService,
    @Inject('environment') private environment: any,
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

  private loadTableConfig() {
    this.tableConfigService.load(this.tableId).subscribe((tableConfigResp) => {
      if (tableConfigResp) {
        this.tableViewConfig = this.getTableConfig(tableConfigResp);
        this.tableSettings = this.tableViewConfig.settings;
        this.tableColumns = this.tableViewConfig.columns;

        console.log('Table configuration:', this.tableViewConfig);

        this.tableInit();
      }
    });
  }

  private tableInit() {
    if (!this.title && this.tableSettings.title) {
      this.generalTexts[toCamelCase(this.tableSettings.title)] = {
        labelId: this.tableSettings.title,
      };
    }

    if (!this.rowsPerPage && this.tableSettings.rowsPerPage) {
      this.rowsPerPage = this.tableSettings.rowsPerPage;
    }

    this.setColumnsForExport();
    this.fetchTableRows();
  }

  private fetchTableRows() {
    if (!this.tableSettings.url) {
      console.warn('Table url is not defined');
      return;
    }

    if (this.items.length > 0) {
      console.warn('Rows already have data acquired from input!');
      return;
    }

    const { url, query } = this.tableSettings;

    const options = Object.assign(
      {
        page: this.pageNumber,
        size: this.rowsPerPage,
      },
      query
    );

    if (this.tableSettings.softDelete) {
      options['isEnabled.equals'] = true;
    }

    this.requestService
      .request(this.environment.apiUrl, 'GET', url, options)
      .subscribe((response) => {
        console.log('response', response);
        let data = [];
        let total = 0;
        if (response && response.body) {
          data = response.body;
          total = response.headers.get('x-total-count') || 0;
        }
        this.setData(data, total);
      });
  }

  private setData(data: any[], total: number) {
    this.totalRows = total;

    this.items =
      this.tableSettings.transformData && this.transformDataFn
        ? this.transformDataFn(data)
        : data;
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
        col.header = this.generalTexts[toCamelCase(col.headerId!)].label;
        if (col.globalSearch) {
          this.addFieldToGlobalFilterFields(col);
        }
      });

      this.setColumnWidth();
    };
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

  private setColumnWidth() {
    this.columnWidth = 100 / this.tableColumns.length;
  }

  isRowSelectable() {
    return !this.rowsSelectionDisabled;
  }

  getCustomSortFn(event: SortEvent) {
    if (this.customSortFn) this.customSortFn(event);
  }

  onRowSelect(event: TableRowSelectEvent) {
    this.selectedItemsChange.emit(this.selectedItems);
    this.onTableRowSelect.emit(event.data as TData);
  }

  onRowUnselect(event: TableRowSelectEvent) {
    this.selectedItemsChange.emit(this.selectedItems);
    this.onTableRowUnselect.emit(event.data as TData);
  }

  selectAll(data: Event) {
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
}
