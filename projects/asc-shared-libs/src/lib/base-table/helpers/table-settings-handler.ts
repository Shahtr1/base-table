import { toCamelCase } from '../../common/utils';
import { BaseTableComponent } from '../base-table.component';

/**
 * TableSettingsHandler:
 * Handles the logic for setting table settings like title, rows per page, export, etc.
 * */
export class TableSettingsHandler<TData> {
  constructor(private tableComponent: BaseTableComponent<TData>) {}

  handleManualSettings() {
    const { tableSettings } = this.tableComponent;

    if (!this.tableComponent.inputOptions.title && tableSettings.title) {
      const camelCaseTitle = toCamelCase(tableSettings.title);
      this.tableComponent.generalTexts[camelCaseTitle] = {
        labelId: tableSettings.title,
      };
    }

    if (!this.tableComponent.rowsPerPage && tableSettings.rowsPerPage) {
      this.tableComponent.rowsPerPage = tableSettings.rowsPerPage;
    }

    if (this.tableComponent.inputOptions.export === undefined) {
      this.tableComponent.inputOptions.export = tableSettings.export;
    }

    if (this.tableComponent.inputOptions.showAddButton === undefined) {
      this.tableComponent.inputOptions.showAddButton =
        tableSettings.showAddButton;
    }

    if (this.tableComponent.inputOptions.globalSearch === undefined) {
      this.tableComponent.inputOptions.globalSearch =
        tableSettings.globalSearch;
    }

    if (this.tableComponent.inputOptions.firstColumnFrozen === undefined) {
      this.tableComponent.inputOptions.firstColumnFrozen =
        tableSettings.firstColumnFrozen;
    }
  }
}
