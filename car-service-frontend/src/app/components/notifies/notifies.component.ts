import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'notifies',
  templateUrl: './notifies.component.html',
  styleUrls: ['./notifies.component.scss']
})
export class NotifiesComponent {
  @Input()
  notifies: any[] = [];
  @Output()
  closeEmit: EventEmitter<void> = new EventEmitter<void>();

  close() {
    this.closeEmit.emit();
  }

}
