import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../request/request.service';
import { PropertyConfig } from '../../model/property-config.model';
import { IPropertyService } from './iproperty.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyService implements IPropertyService {
  constructor(private restService: RequestService) {}

  getProperties(): Observable<PropertyConfig[]> {
    return this.restService.request('GET', '/api/app-properties');
  }
}
