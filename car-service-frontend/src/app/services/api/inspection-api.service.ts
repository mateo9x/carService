import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';
import {Inspection} from '../../models/inspection.model';

@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {
  INSPECTION_URL = APP_URL + API_PREFIX + '/inspections';

  constructor(private httpClient: HttpClient) {
  }

  saveInspection(inspection: Inspection) {
    return this.httpClient.post<Inspection>(this.INSPECTION_URL, inspection);
  }

  getInspectionsByVehicleId(vehicleId: string) {
    return this.httpClient.get<Inspection[]>(`${this.INSPECTION_URL}/vehicle/${vehicleId}`);
  }

  deleteInspection(id: string) {
    return this.httpClient.delete<void>(`${this.INSPECTION_URL}/${id}`);
  }

}
