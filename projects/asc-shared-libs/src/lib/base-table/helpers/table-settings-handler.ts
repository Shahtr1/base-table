import { toCamelCase } from '../../common/utils';
import { BaseTableComponent } from '../base-table.component';

export class TableSettingsHandler<TData> {
  constructor(private tableComponent: BaseTableComponent<TData>) {}

  handleManualSettings() {
    const { tableSettings } = this.tableComponent;

    if (!this.tableComponent.title && tableSettings.title) {
      const camelCaseTitle = toCamelCase(tableSettings.title);
      this.tableComponent.generalTexts[camelCaseTitle] = {
        labelId: tableSettings.title,
      };
    }

    if (!this.tableComponent.rowsPerPage && tableSettings.rowsPerPage) {
      this.tableComponent.rowsPerPage = tableSettings.rowsPerPage;
    }

    if (this.tableComponent.export === undefined) {
      this.tableComponent.export = tableSettings.export;
    }

    if (this.tableComponent.showAddButton === undefined) {
      this.tableComponent.showAddButton = tableSettings.showAddButton;
    }

    if (this.tableComponent.globalSearch === undefined) {
      this.tableComponent.globalSearch = tableSettings.globalSearch;
    }

    if (this.tableComponent.firstColumnFrozen === undefined) {
      this.tableComponent.firstColumnFrozen = tableSettings.firstColumnFrozen;
    }
  }
}
