import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';
import {SchedulerEvent} from '../../models/scheduler-event.model';

@Injectable({
  providedIn: 'root'
})
export class SchedulerEventApiService {
  SCHEDULER_EVENTS_URL = APP_URL + API_PREFIX + '/scheduler-events';

  constructor(private httpClient: HttpClient) {
  }

  saveSchedulerEvent(schedule: SchedulerEvent) {
    return this.httpClient.post<SchedulerEvent>(this.SCHEDULER_EVENTS_URL, schedule);
  }

  getSchedulerEventsByDateBetween(dateFrom: string, dateTo: string) {
    const params = new HttpParams()
      .set('dateFrom', dateFrom)
      .set('dateTo', dateTo);
    return this.httpClient.get<SchedulerEvent[]>(this.SCHEDULER_EVENTS_URL, {params: params});
  }

  deleteSchedulerEvent(id: string) {
    return this.httpClient.delete<void>(`${this.SCHEDULER_EVENTS_URL}/${id}`);
  }
}
