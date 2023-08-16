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
      L_ACCOUNT_PURPOSE: 'Account Purpose',
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
    });
  }
}
