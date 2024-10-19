import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';

@Injectable({
  providedIn: 'root'
})
export class VehicleApiService {
  VEHICLE_GALLERY_URL = APP_URL + API_PREFIX + '/vehicle-galleries';

  constructor(private httpClient: HttpClient) {
  }

  getVehicleGallery(vehicleId: string) {
    return this.httpClient.get<string[]>(`${this.VEHICLE_GALLERY_URL}/${vehicleId}`);
  }
}
