import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Inspection} from '../../../models/inspection.model';

@Component({
  selector: 'my-inspection-card',
  templateUrl: './my-inspection-card.component.html',
  styleUrls: ['./my-inspection-card.component.scss']
})
export class MyInspectionCardComponent {
  @Input()
  inspection: Inspection | null = null;

  @Output()
  deleteInspectionEmitter: EventEmitter<string> = new EventEmitter<string>();

  getBooleanLabel(value: boolean) {
    if (value) {
      return 'Tak';
    }
    return 'Nie';
  }

  deleteInspection(id: string | undefined) {
    this.deleteInspectionEmitter.emit(id as string);
  }
}
