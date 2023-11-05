import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';
import {Vehicle} from '../../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleApiService {
  VEHICLE_URL = APP_URL + API_PREFIX + '/vehicles';

  constructor(private httpClient: HttpClient) {
  }

  saveVehicle(vehicleRequest: Vehicle) {
    return this.httpClient.post<Vehicle>(this.VEHICLE_URL, vehicleRequest);
  }

  updateVehicle(vehicle: Vehicle) {
    return this.httpClient.put<Vehicle>(this.VEHICLE_URL, vehicle);
  }

  getMyVehicles() {
    return this.httpClient.get<Vehicle[]>(`${this.VEHICLE_URL}/my-vehicles`);
  }

  deleteVehicle(id: string) {
    return this.httpClient.delete<void>(`${this.VEHICLE_URL}/${id}`);
  }
}
