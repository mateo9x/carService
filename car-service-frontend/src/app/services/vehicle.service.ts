import {Injectable} from '@angular/core';
import {Vehicle} from '../models/vehicle.model';
import {VehicleApiService} from './api/vehicle-api.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private apiService: VehicleApiService) {
  }

  saveVehicle(vehicleRequest: Vehicle) {
    return this.apiService.saveVehicle(vehicleRequest);
  }

  updateVehicle(vehicle: Vehicle) {
    return this.apiService.updateVehicle(vehicle);
  }

  getMyVehicles() {
    return this.apiService.getMyVehicles();
  }

  deleteVehicle(id: string) {
    return this.apiService.deleteVehicle(id);
  }


}
