import {
  Component,
  EventEmitter,
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

@Component({
  selector: 'lib-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent<TData> implements OnInit {
  @Input({ required: true }) tableId!: string;

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

  @Input() sort = true;

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

  generalTexts: GeneralText = {
    globalSearch: { labelId: 'L_GLOBAL_SEARCH' },
    defaultEmptyMessage: { labelId: 'L_DEFAULT_EMPTY_MESSAGE' },
    currentPageReportTemplate: { labelId: 'L_CURRENT_PAGE_REPORT_TEMPLATE' },
  };

  constructor(
    private primengConfig: PrimeNGConfig,
    private tableConfigService: TableConfigService,
    private textService: TextService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.loadTableConfig();
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
    this.setColumnsForExport();
  }

  private getTableConfig(tableConfigResp: TableViewConfig) {
    if (tableConfigResp.settings.modifyConfig && this.modifyConfigFn) {
      tableConfigResp = this.modifyConfigFn(tableConfigResp);
    }
    return tableConfigResp;
  }

  private setColumnsForExport() {
    this.pushTableColumnsHeaderIdToGeneralTexts(() => {
      //   TODO: add success function here
    });

    this.exportColumns = this.tableColumns.map((col) => ({
      title: col.header!,
      dataKey: col.field,
    }));
  }

  private pushTableColumnsHeaderIdToGeneralTexts(
    addHeaderToTableColumns: () => void
  ) {
    this.tableColumns.forEach((col) => {
      if (col.headerId) {
        const key = toCamelCase(col.headerId);
        this.generalTexts[key] = { labelId: col.headerId };
      }
    });

    this.convertLocales(addHeaderToTableColumns);
  }

  private convertLocales(success: () => void) {
    this.textService.convert(this.generalTexts).subscribe((res) => {
      this.generalTexts = { ...res };
      if (!this.emptyMessage) {
        this.emptyMessage = this.generalTexts['defaultEmptyMessage'].label!;
      }
      // success();
    });
  }

  private setColumnWidth() {
    this.columnWidth = 100 / 2;
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
}
