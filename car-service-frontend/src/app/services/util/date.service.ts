import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private datePipe: DatePipe) {
  }

  public convertDateToJavaLocalDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
