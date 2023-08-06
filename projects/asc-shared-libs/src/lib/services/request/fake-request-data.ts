import { TableViewConfig } from '../../model/table-config.model';
import * as _ from 'lodash';

export const testBaseTableData: TableViewConfig = {
  settings: {
    url: '/api/v5/account-purposes',
    export: false,
    editButton: true,
    deleteButton: true,
    addButton: true,
    title: 'L_ACCOUNT_PURPOSE',
    transformData: true,
    editCallBack: true,
    addCallBack: true,
    softDelete: true,
    modifyConfig: true,
  },
  columns: [
    { field: 'uuid', headerId: 'L_REF_ID', sort: true, filter: 'search' },
    {
      field: 'shortName',
      headerId: 'L_ACCOUNT_PURPOSE_SHORT_NAME',
      sort: true,
      globalSearch: true,
      filter: 'search',
    },
    {
      field: 'fullName',
      headerId: 'L_ACCOUNT_PURPOSE_FULL_NAME',
      filter: 'search',
    },
    {
      field: 'trxnStatus',
      headerId: 'L_TRXN_STATUS',
      globalSearch: true,
      sourceUrl: '/api/v5/work-flow-states?size=20',
      optionLabel: 'desc',
      filter: 'select',
      sort: true,
      type: 'select',
      translate: true,
    },
  ],
};

export function getAccountPurposeData() {
  let testAccountPurposeData = [];
  for (let i = 0; i < 100; i++) {
    testAccountPurposeData.push({
      uuid: 'uuid' + i,
      shortName: 'shortName' + i,
      fullName: 'fullName' + i,
      trxnStatus: _.random(0, 1) === 1 ? 'ACTIVE' : 'INACTIVE',
    });
  }

  return testAccountPurposeData;
}
