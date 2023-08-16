import { Component, Input } from '@angular/core';
import { InputField } from '../../../model/table-config.model';

@Component({
  selector: 'lib-cell-editor',
  templateUrl: './cell-editor.component.html',
  styleUrls: ['./cell-editor.component.scss'],
})
export class CellEditorComponent {
  @Input({ required: true }) field: any;
  @Input() inputField?: InputField;
}
