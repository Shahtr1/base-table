import { Injectable } from '@angular/core';
import { ItextService } from './itext.service';
import { Observable } from 'rxjs';
import { GeneralText } from '../../model/lib.model';

@Injectable({
  providedIn: 'root',
})
export class FakeTextService implements ItextService {
  constructor() {}

  convert(data: GeneralText[]): Observable<GeneralText[]> {}
}
