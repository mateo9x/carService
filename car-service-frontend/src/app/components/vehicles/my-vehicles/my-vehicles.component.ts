import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../../../services/vehicle.service';
import {Vehicle} from '../../../models/vehicle.model';
import {VehicleAddDialogComponent} from '../add-dialog/vehicle-add-dialog.component';
import {filter} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {SnackBarService, SnackBarType} from '../../../util/services/snack-bar.service';
import {VehicleEditDialogComponent} from '../edit-dialog/vehicle-edit-dialog.component';
import {ConfirmDialogComponent} from '../../util/confirm-dialog.component';

@Component({
  selector: 'my-vehicles',
  templateUrl: './my-vehicles.component.html',
  styleUrls: ['./my-vehicles.component.scss']
})
export class MyVehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService,
              private dialog: MatDialog,
              private snackBarService: SnackBarService) {
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

  openAddVehicleDialog() {
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

  openEditVehicleDialog(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(VehicleEditDialogComponent, {
      autoFocus: false,
      maxHeight: '90vh',
      data: Object.assign({}, vehicle)
    });
    dialogRef.afterClosed()
      .pipe(
        filter((data) => data)
      )
      .subscribe({
        next: (data) => this.vehicleService.updateVehicle(data).subscribe({
          next: () => {
            this.snackBarService.openSnackBar('Pojazd zaktualizowany pomyślnie', SnackBarType.SUCCESS);
            this.getMyVehicles();
          },
          error: (error) => {
            if (error.error) {
              this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
            } else {
              this.snackBarService.openSnackBar('Pojazd nie został zaktualizowany', SnackBarType.ERROR);
            }
          }
        })
      });
  }

  deleteVehicle(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Usuń pojazd',
        message: `Czy na pewno chcesz usunąć wybrany pojazd ${vehicle.brand} ${vehicle.model} (${vehicle.licensePlate}) ?`
      }
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.vehicleService.deleteVehicle(vehicle.id!).subscribe({
            next: () => {
              this.snackBarService.openSnackBar('Pojazd usunięty pomyślnie', SnackBarType.SUCCESS);
              this.getMyVehicles();
            },
            error: () => this.snackBarService.openSnackBar('Pojazd nie został usunięty', SnackBarType.ERROR)
          })
        }
      }
    });
  }
}
