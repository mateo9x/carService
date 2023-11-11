import {Injectable} from '@angular/core';
import {AttachmentApiService} from './api/attachment-api.service';
import {AttachmentType} from '../models/attachment-type.enum';
import {saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private apiService: AttachmentApiService) {
  }

  downloadAttachment(attachmentType: AttachmentType, fileName: string) {
    this.apiService.downloadAttachment(attachmentType, fileName).subscribe({
      next: (file) => {
        const fileBlob = new Blob([file], {type: 'text/plain'});
        saveAs(fileBlob, this.convertFileName(fileName));
      }
    });
  }

  private convertFileName(fileName: string): string {
    return fileName.substring(fileName.indexOf('_', 0) + 1, fileName.length);
  }
}
