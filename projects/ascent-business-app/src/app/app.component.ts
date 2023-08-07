import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { TableViewConfig } from '../../../asc-shared-libs/src/lib/model/table-config.model';
import * as _ from 'lodash';

type AccountPurpose = {
  uuid: string;
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
  constructor() {}

  accountPurposes: AccountPurpose[] = [];

  selectedAccountPurposes: AccountPurpose[] = [];

  ngOnInit() {
    this.accountPurposes = this.getAccountPurposeData();
  }

  private getAccountPurposeData() {
    let testAccountPurposeData = [];
    for (let i = 0; i < 100; i++) {
      testAccountPurposeData.push({
        uuid: 'uuid' + i,
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
      },
      {
        field: 'isActive',
        headerId: 'L_IS_ACTIVE',
        filter: 'boolean',
      },
    ];

    config.settings.transformData = true;
    // config.settings.export = false;
    // config.settings.showAddButton = false;
    config.settings.globalSearch = true;

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
