import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'attachmentPipe'
})
export class AttachmentPipe implements PipeTransform {
  transform(fileName: string): string {
    if (fileName) {
      return fileName.substring(fileName.indexOf('_', 0) + 1, fileName.length);
    }
    return '';
  }

}
