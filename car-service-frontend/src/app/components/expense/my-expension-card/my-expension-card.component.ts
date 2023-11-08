import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Expension} from '../../../models/expension.model';

@Component({
  selector: 'my-expension-card',
  templateUrl: './my-expension-card.component.html',
  styleUrls: ['./my-expension-card.component.scss']
})
export class MyExpensionCardComponent {
  @Input()
  expension: Expension | null = null;

  @Output()
  deleteExpensionEmitter: EventEmitter<string> = new EventEmitter<string>();

  deleteExpension(id: string | undefined) {
    this.deleteExpensionEmitter.emit(id as string);
  }

  downloadAttachment(attachment: string) {

  }
}
