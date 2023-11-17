import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';
import {NgxTimelineEvent} from '@frxjs/ngx-timeline/lib/models';

@Injectable({
  providedIn: 'root'
})
export class TimelineApiService {
  TIMELINE_URL = APP_URL + API_PREFIX + '/timelines';

  constructor(private httpClient: HttpClient) {
  }

  getTimelineHistoryForVehicle(vehicleId: string) {
    return this.httpClient.get<NgxTimelineEvent[]>(`${this.TIMELINE_URL}/vehicle/${vehicleId}`);
  }

}
