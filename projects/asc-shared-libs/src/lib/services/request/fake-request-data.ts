import { TableViewConfig } from '../../model/table-config.model';
import * as _ from 'lodash';

export const testBaseTableData: TableViewConfig = {
  settings: {
    url: '/api/v5/account-purposes',
    showEditButton: true,
    showDeleteButton: true,
    showAddButton: false,
    title: 'L_ACCOUNT_PURPOSE',
    transformData: true,
    editCallBack: true,
    addCallBack: true,
    softDelete: true,
    modifyConfig: true,
    globalSearch: false,
  },
  columns: [
    { field: 'uuid', headerId: 'L_REF_ID', sort: true, filter: 'text' },
    {
      field: 'shortName',
      headerId: 'L_ACCOUNT_PURPOSE_SHORT_NAME',
      sort: true,
      globalSearch: true,
      filter: 'select',
    },
    {
      field: 'middleName',
      headerId: 'L_ACCOUNT_PURPOSE_MIDDLE_NAME',
      filter: 'multiselect',
      sort: true,
    },
    {
      field: 'fullName',
      headerId: 'L_ACCOUNT_PURPOSE_FULL_NAME',
      sourceUrl: '/api/v5/work-flow-states?size=20',
      optionLabel: 'desc',
    },
    {
      field: 'trxnStatus',
      headerId: 'L_TRXN_STATUS',
      globalSearch: true,
      filter: 'select',
    },
  ],
};

export function getAccountPurposeData() {
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
