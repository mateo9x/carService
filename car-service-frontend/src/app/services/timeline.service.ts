import {Injectable} from '@angular/core';
import {TimelineApiService} from './api/timeline-api.service';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private apiService: TimelineApiService) {
  }

  getTimelineHistoryForVehicle(vehicleId: string) {
    return this.apiService.getTimelineHistoryForVehicle(vehicleId).pipe(
      tap((timeLineHistories) =>
        timeLineHistories.forEach((timelineHistory) => timelineHistory.timestamp = new Date(timelineHistory.timestamp as unknown as string))
      )
    );
  }


}
