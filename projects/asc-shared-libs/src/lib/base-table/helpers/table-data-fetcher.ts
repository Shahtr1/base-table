import { BaseTableComponent } from '../base-table.component';
import { v4 as uuidv4 } from 'uuid';

export class TableDataFetcher<TData> {
  constructor(private tableComponent: BaseTableComponent<TData>) {}

  fetchTableRows() {
    const {
      tableSettings,
      rowsPerPage,
      pageNumber,
      items,
      requestService,
    } = this.tableComponent;

    if (!tableSettings.url) {
      console.warn('Table url is not defined');
      return;
    }

    if (this.tableComponent.setItemsEmpty) {
      console.warn('Items manually set to empty!');
      if (tableSettings.url)
        console.warn(`Fetching from api ${tableSettings.url} cancelled!`);
      return;
    }

    if (items.length > 0) {
      console.warn('Rows already have data acquired from input!');
      this.setData(items, items.length);
      if (tableSettings.url)
        console.warn(`Fetching from api ${tableSettings.url} cancelled!`);
      return;
    }

    const { url, query } = tableSettings;

    const options = Object.assign(
      {
        page: pageNumber,
        size: rowsPerPage,
      },
      query
    );

    if (tableSettings.softDelete) {
      options['isEnabled.equals'] = true;
    }

    requestService
      .request(this.tableComponent.environment.apiUrl, 'GET', url, options)
      .subscribe((response) => {
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
    this.tableComponent.totalRows = total;

    this.tableComponent.items =
      this.tableComponent.tableSettings.transformData &&
      this.tableComponent.transformDataFn
        ? this.tableComponent.transformDataFn(data)
        : data;

    this.setUniqueKeyForTableItems(this.tableComponent.items);
  }

  private setUniqueKeyForTableItems(items: any[]) {
    items.map((item) => {
      item[this.tableComponent.dataKey] = uuidv4();
    });
  }
}
