import {Injectable} from '@angular/core';
import {Vehicle} from '../models/vehicle.model';
import {VehicleApiService} from './api/vehicle-api.service';
import {AuthenticationService} from './authentication.service';
import {SnackBarService, SnackBarType} from './common/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private apiService: VehicleApiService,
              private authenticationService: AuthenticationService,
              private snackBarService: SnackBarService) {
  }

  saveVehicle(vehicleRequest: Vehicle) {
    this.apiService.saveVehicle(vehicleRequest).subscribe({
      next: () => {
        this.authenticationService.getUserLogged(false);
        this.snackBarService.openSnackBar('Pojazd dodany pomyślnie', SnackBarType.SUCCESS);
      },
      error: (error) => {
        if (error.error) {
          this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
        } else {
          this.snackBarService.openSnackBar('Pojazd nie został dodany', SnackBarType.ERROR);
        }
      }
    });
  }


}
