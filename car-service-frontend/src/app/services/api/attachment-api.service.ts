import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';
import {AttachmentType} from '../../models/attachment-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AttachmentApiService {
  ATTACHMENT_URL = APP_URL + API_PREFIX + '/attachments';

  constructor(private httpClient: HttpClient) {
  }

  downloadAttachment(attachmentType: AttachmentType, fileName: string) {
    const requestOptions: Object = {
      responseType: 'blob'
    }
    return this.httpClient.get<any>(`${this.ATTACHMENT_URL}/${attachmentType}/${fileName}`, requestOptions);
  }
}
