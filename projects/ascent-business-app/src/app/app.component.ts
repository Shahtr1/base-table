import { Component } from '@angular/core';

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
export class AppComponent {}
