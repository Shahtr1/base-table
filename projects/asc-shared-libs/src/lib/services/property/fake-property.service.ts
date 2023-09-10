import { Injectable } from '@angular/core';
import { IPropertyService } from './iproperty.service';
import { Observable, of } from 'rxjs';
import { PropertyConfig } from '../../model/property-config.model';

@Injectable({
  providedIn: 'root',
})
export class FakePropertyService implements IPropertyService {
  getProperties(): Observable<PropertyConfig[]> {
    return of([
      {
        id: 1,
        name: 'Default language',
        description: 'This is default language',
        value: 'ENGLISH',
        uuid: 'DEFAULT_LANGUAGE',
      },
    ]);
  }
}
