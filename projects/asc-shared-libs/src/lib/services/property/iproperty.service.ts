import { Observable } from 'rxjs';
import { PropertyConfig } from '../../model/property-config.model';

export interface IPropertyService {
  getProperties(): Observable<PropertyConfig[]>;
}
