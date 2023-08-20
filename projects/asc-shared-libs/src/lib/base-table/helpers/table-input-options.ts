import { SortEvent } from 'primeng/api';
import { exportType } from '../comps/toolbar-buttons/model/toolbar-button.model';
import { TableViewConfig } from '../../model/table-config.model';

export class TableInputOptions<TData> {
  inferType?: TData;
  firstColumnFrozen?: boolean;
  export?: boolean;
  globalSearch?: boolean;
  title?: string;
  showAddButton?: boolean;
  scrollHeight: number | 'auto' = 'auto';
  emptyMessage!: string;
  selectionPageOnly = false;
  rowHover = true;
  selectionMode: 'single' | 'multiple' | undefined = undefined;
  rowExpand = false;
  globalFilterFields: string[] = [];
  customSort = false;
  rowsSelectionDisabled = false;
  paginator = true;
  responsiveLayoutBreakpoint: number = 768;
  currentPageReportTemplate!: string;
  rowsPerPageOptions = [10, 20, 50];
  showCaption = true;
  showSummary = true;
  exportTypes: exportType[] = ['pdf', 'excel', 'csv'];
  exportFileName!: string;
  customSortFn?: (event: SortEvent) => number;
  modifyConfigFn?: (config: TableViewConfig) => TableViewConfig;
  transformDataFn?: (data: any[]) => any[];

  constructor(options: Partial<TableInputOptions<TData>> = {}) {
    Object.assign(this, options);
  }
}
