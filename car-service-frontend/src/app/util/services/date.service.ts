import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private datePipe: DatePipe) {
  }

  public getDayName(date: Date, locale: any) {
    return date.toLocaleDateString(locale, {weekday: 'long'});
  }

  public convertDateToJavaLocalDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  public zeroDate(date: Date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setMilliseconds(0);
  }
}
