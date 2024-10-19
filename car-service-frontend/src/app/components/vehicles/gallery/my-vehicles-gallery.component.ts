import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../../../services/vehicle.service';
import {Vehicle} from '../../../models/vehicle.model';
import {VehicleAddDialogComponent} from '../add-dialog/vehicle-add-dialog.component';
import {filter} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {SnackBarService, SnackBarType} from '../../../util/services/snack-bar.service';
import {VehicleApiService} from "../../../services/api/vehicle-gallery-api.service";

@Component({
  selector: 'my-vehicles-gallery',
  templateUrl: './my-vehicles-gallery.component.html',
  styleUrls: ['./my-vehicles-gallery.component.scss']
})
export class MyVehiclesGalleryComponent implements OnInit {
  vehicles: Vehicle[] = [];
  vehicleUris: string[] = [];

  constructor(private vehicleService: VehicleService,
              private dialog: MatDialog,
              private snackBarService: SnackBarService,
              private vehicleApiService: VehicleApiService) {
  }

  ngOnInit() {
    this.getMyVehicles();
  }

  getMyVehicles() {
    this.vehicleService.getMyVehicles().subscribe({
      next: (vehicles) => this.vehicles = vehicles,
      error: () => this.vehicles = []
    });
  }

  openAddVehiclePhotosDialog() {
    const dialogRef = this.dialog.open(VehicleAddDialogComponent, {
      autoFocus: false,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed()
      .pipe(
        filter((data) => data)
      )
      .subscribe({
        next: (data) => this.vehicleService.saveVehicle(data).subscribe({
          next: () => {
            this.snackBarService.openSnackBar('Pojazd dodany pomyślnie', SnackBarType.SUCCESS);
            this.getMyVehicles();
          },
          error: (error) => {
            if (error.error) {
              this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
            } else {
              this.snackBarService.openSnackBar('Pojazd nie został dodany', SnackBarType.ERROR);
            }
          }
        })
      });
  }

  getGalleryForVehicle(id: string) {
    this.vehicleApiService.getVehicleGallery(id).subscribe({
      next: (uris) => this.vehicleUris = uris
    });
  }
}
