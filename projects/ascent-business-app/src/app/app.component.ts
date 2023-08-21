import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { TableViewConfig } from '../../../asc-shared-libs/src/lib/model/table-config.model';
import * as _ from 'lodash-es';
import { TableInputOptions } from '../../../asc-shared-libs/src/lib/base-table/helpers/table-input-options';

type AccountPurpose = {
  refId: string;
  shortName: string;
  middleName: string;
  fullName: string;
  trxnStatus: string;
  isActive: boolean;
  referenceName?: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tableInputOptions!: TableInputOptions<AccountPurpose>;

  constructor() {}

  accountPurposes: AccountPurpose[] = [];

  selectedAccountPurposes: AccountPurpose[] = [];

  ngOnInit() {
    this.accountPurposes = this.getAccountPurposeData();

    this.setTableInputOptions();
  }

  private setTableInputOptions() {
    this.tableInputOptions = new TableInputOptions<AccountPurpose>({
      customSort: false,
      customSortFn: this.customSortFn.bind(this),
      selectionMode: 'multiple',
      rowExpand: true,
      scrollHeight: 370,
      exportTypes: ['pdf', 'csv', 'excel'],
      selectionPageOnly: true,
      modifyConfigFn: this.modifyConfigFn.bind(this),
      transformDataFn: this.transformDataFn.bind(this),
      exportFileName: 'account-purposes',
      globalSearch: true,
      showAddButton: true,
      rowsSelectionDisabled: false,
    });
  }

  private getAccountPurposeData(): AccountPurpose[] {
    let testAccountPurposeData = [];
    for (let i = 0; i < 100; i++) {
      testAccountPurposeData.push({
        refId: 'refId' + i,
        shortName: 'shortName' + i,
        middleName: 'middleName' + i,
        fullName: 'fullName' + i,
        trxnStatus: _.random(0, 1) === 1 ? 'Completed' : 'Failed',
        isActive: _.random(0, 1) === 1,
      });
    }

    return testAccountPurposeData;
  }

  modifyConfigFn(config: TableViewConfig): TableViewConfig {
    config.columns = [
      ...config.columns,
      {
        field: 'referenceName',
        headerId: 'L_REFERENCE_NAME',
        filter: 'text',
        input: {
          type: 'text',
          placeholderId: 'L_ENTER_REFERENCE_NAME',
          textConfig: {
            icon: 'pi pi-camera',
            position: 'right',
          },
        },
      },
      {
        field: 'isActive',
        headerId: 'L_IS_ACTIVE',
        filter: 'boolean',
      },
    ];

    config.settings.transformData = true;
    config.settings.export = true;
    config.settings.showAddButton = false;
    config.settings.globalSearch = true;
    config.settings.firstColumnFrozen = true;

    return config;
  }

  transformDataFn(data: AccountPurpose[]): AccountPurpose[] {
    data.forEach((item) => {
      item.referenceName = item.shortName + ' ' + item.middleName;
    });
    return data;
  }

  customSortFn: (event: SortEvent) => number = (event: SortEvent) => {
    return 1;
  };

  onRowUnselect(data: AccountPurpose) {
    console.log('onRowUnselect', data);
  }

  onRowSelect(data: AccountPurpose) {
    console.log('onRowSelect', data);
  }
}
