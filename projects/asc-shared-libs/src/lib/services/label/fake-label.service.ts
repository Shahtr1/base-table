import { Injectable } from '@angular/core';
import { ILabelService } from './ilabel.service';
import { Observable, of } from 'rxjs';
import { LabelConfig } from '../../model/label-config.model';

@Injectable({
  providedIn: 'root',
})
export class FakeLabelService implements ILabelService {
  getLabels(): Observable<LabelConfig> {
    return of({
      english: {
        L_CLIENT_ACCOUNTS: 'Client Accounts',
        L_NEW: 'New',
        L_NEW_TOOLTIP: 'Add new row',
        L_DELETE_ALL_SELECTED: 'Delete all selected rows',
        L_EXPORT: 'Export',
        L_CURRENT_PAGE_REPORT_TEMPLATE:
          'Showing {first} to {last} of {totalRecords} entries',
        L_REF_ID: 'Ref Id',
        L_ACCOUNT_PURPOSE_SHORT_NAME: 'Short Name',
        L_ACCOUNT_PURPOSE_MIDDLE_NAME: 'Middle Name',
        L_ACCOUNT_PURPOSE_FULL_NAME: 'Full Name',
        L_TRXN_STATUS: 'Transaction Status',
        L_GLOBAL_SEARCH: 'Search keyword',
        L_SEARCH: 'Search',
        L_SELECT: 'Select',
        L_SELECT_MULTIPLE: 'Select multiple',
        L_DEFAULT_EMPTY_MESSAGE: 'No data found',
        L_SELECTED_ONLY: 'Selected only',
        L_IS_ACTIVE: 'Is Active',
        L_REFERENCE_NAME: 'Reference Name',
        L_ENTER_REFERENCE_NAME: 'Enter reference name',
        L_ENTER_SHORT_NAME: 'Enter short name',
        L_ENTER_MIDDLE_NAME: 'Enter middle name',
        L_ENTER_FULL_NAME: 'Enter full name',
        L_ENTER_TRXN_STATUS: 'Enter transaction status',
        L_NAME_1: 'Name 1',
        L_NAME_2: 'Name 2',
      },
      arabic: {
        L_CLIENT_ACCOUNTS: 'Client Accounts Ar',
        L_NEW: 'New Ar',
        L_NEW_TOOLTIP: 'Add new row Ar',
        L_DELETE_ALL_SELECTED: 'Delete all selected rows Ar',
        L_EXPORT: 'Export Ar',
        L_CURRENT_PAGE_REPORT_TEMPLATE:
          'Showing {first} to {last} of {totalRecords} entries Ar',
        L_REF_ID: 'Ref Id Ar',
        L_ACCOUNT_PURPOSE_SHORT_NAME: 'Short Name Ar',
        L_ACCOUNT_PURPOSE_MIDDLE_NAME: 'Middle Name Ar',
        L_ACCOUNT_PURPOSE_FULL_NAME: 'Full Name Ar',
        L_TRXN_STATUS: 'Transaction Status Ar',
        L_GLOBAL_SEARCH: 'Search keyword Ar',
        L_SEARCH: 'Search Ar',
        L_SELECT: 'Select Ar',
        L_SELECT_MULTIPLE: 'Select multiple Ar',
        L_DEFAULT_EMPTY_MESSAGE: 'No data found Ar',
        L_SELECTED_ONLY: 'Selected only Ar',
        L_IS_ACTIVE: 'Is Active Ar',
        L_REFERENCE_NAME: 'Reference Name Ar',
        L_ENTER_REFERENCE_NAME: 'Enter reference name Ar',
        L_ENTER_SHORT_NAME: 'Enter short name Ar',
        L_ENTER_MIDDLE_NAME: 'Enter middle name Ar',
        L_ENTER_FULL_NAME: 'Enter full name Ar',
        L_ENTER_TRXN_STATUS: 'Enter transaction status Ar',
        L_NAME_1: 'Name 1 Ar',
        L_NAME_2: 'Name 2 Ar',
      },
    });
  }
}
