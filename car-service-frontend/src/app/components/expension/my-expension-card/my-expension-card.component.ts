import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Expension} from '../../../models/expension.model';
import {AttachmentService} from '../../../services/attachment.service';
import {AttachmentType} from '../../../models/attachment-type.enum';

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

  constructor(private attachmentService: AttachmentService) {
  }

  deleteExpension(id: string | undefined) {
    this.deleteExpensionEmitter.emit(id as string);
  }

  downloadAttachment(attachmentName: string) {
    this.attachmentService.downloadAttachment(AttachmentType.EXPENSION, attachmentName);
  }
}
