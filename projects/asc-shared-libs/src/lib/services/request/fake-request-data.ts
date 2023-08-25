import * as _ from 'lodash-es';

export const testBaseTableData: any = {
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
    export: false,
  },
  columns: [
    { field: 'refId', headerId: 'L_REF_ID', sort: true, filter: 'text' },
    {
      field: 'shortName',
      headerId: 'L_ACCOUNT_PURPOSE_SHORT_NAME',
      sort: true,
      globalSearch: true,
      filter: 'select',
      input: {
        type: 'text',
        placeholderId: 'L_ENTER_SHORT_NAME',
      },
    },
    {
      field: 'middleName',
      headerId: 'L_ACCOUNT_PURPOSE_MIDDLE_NAME',
      filter: 'multiselect',
      sort: true,
      input: {
        type: 'multiselect',
        placeholderId: 'L_ENTER_MIDDLE_NAME',
      },
    },
    {
      field: 'fullName',
      headerId: 'L_ACCOUNT_PURPOSE_FULL_NAME',
      sourceUrl: '/api/v5/work-flow-states?size=20',
      optionLabel: 'desc',
      input: {
        type: 'select',
        placeholderId: 'L_ENTER_FULL_NAME',
        selectConfig: {
          options: [
            {
              myLabel: 'name',
              value: 'id',
              key: 'abc',
            },
            {
              myLabel: 'name2',
              value: 'id3',
              key: 'def',
            },
          ],
          optionLabel: 'myLabel',
          filterBy: 'key',
        },
      },
    },
    {
      field: 'trxnStatus',
      headerId: 'L_TRXN_STATUS',
      globalSearch: true,
      filter: 'select',
      input: {
        type: 'checkbox',
        placeholderId: 'L_ENTER_TRXN_STATUS',
      },
    },
  ],
};

export function getAccountPurposeData() {
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
