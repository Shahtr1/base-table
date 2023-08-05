import { Observable } from 'rxjs';
import { LabelConfig } from '../../model/label-config.model';

export interface ILabelService {
  getLabels(): Observable<LabelConfig>;
}
