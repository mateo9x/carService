import {Injectable} from '@angular/core';
import {SchedulerEventApiService} from './api/scheduler-event-api.service';
import {SchedulerEvent} from '../models/scheduler-event.model';

@Injectable({
  providedIn: 'root'
})
export class SchedulerEventService {
  constructor(private apiService: SchedulerEventApiService) {
  }

  saveSchedulerEvent(schedule: SchedulerEvent) {
    return this.apiService.saveSchedulerEvent(schedule);
  }

  getSchedulerEventsByDateBetween(dateFrom: string, dateTo: string) {
    return this.apiService.getSchedulerEventsByDateBetween(dateFrom, dateTo);
  }

  deleteSchedulerEvent(id: string) {
    return this.apiService.deleteSchedulerEvent(id);
  }
}
