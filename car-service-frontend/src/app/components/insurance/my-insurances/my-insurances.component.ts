import {Component, OnInit} from '@angular/core';
import {InsuranceService} from '../../../services/insurance.service';
import {Insurance} from '../../../models/insurance.model';
import {VehicleService} from '../../../services/vehicle.service';
import {Vehicle} from '../../../models/vehicle.model';
import {MatDialog} from '@angular/material/dialog';
import {filter} from 'rxjs';
import {SnackBarService, SnackBarType} from '../../../util/services/snack-bar.service';
import {InsuranceAddDialogComponent} from '../add-dialog/insurance-add-dialog.component';
import {ConfirmDialogComponent} from '../../util/confirm-dialog.component';

@Component({
  selector: 'my-insurances',
  templateUrl: './my-insurances.component.html',
  styleUrls: ['./my-insurances.component.scss']
})
export class MyInsurancesComponent implements OnInit {
  insurances: Insurance[] = [];
  vehicles: Vehicle[] = [];
  vehicleIdSelected: string | null = null;

  constructor(private vehicleService: VehicleService,
              private insuranceService: InsuranceService,
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

  getInsurancesForVehicle(vehicleId: string) {
    this.vehicleIdSelected = vehicleId;
    this.insuranceService.getInsurancesByVehicleId(vehicleId).subscribe({
      next: (insurances) => this.insurances = insurances
    });
  }

  addInsurance(vehicleId: string | null) {
    if (vehicleId) {
      const dialogRef = this.dialog.open(InsuranceAddDialogComponent, {
        autoFocus: false,
        maxHeight: '90vh',
        data: vehicleId
      });
      dialogRef.afterClosed()
        .pipe(
          filter((data) => data)
        )
        .subscribe({
          next: (data) => this.insuranceService.saveInsurance(data).subscribe({
            next: () => {
              this.snackBarService.openSnackBar('Ubezpieczenie dodane pomyślnie', SnackBarType.SUCCESS);
              this.getInsurancesForVehicle(vehicleId);
            },
            error: (error) => {
              if (error.error) {
                this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
              } else {
                this.snackBarService.openSnackBar('Ubezpieczenie nie zostało dodane', SnackBarType.ERROR);
              }
            }
          })
        });
    }
  }

  deleteInsurance(insurance: Insurance) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Usuń ubezpieczenie',
        message: `Czy na pewno chcesz usunąć wybrane ubezpieczenie ${insurance.company} (${insurance.dateFrom} - ${insurance.dateTo}) ?`
      }
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.insuranceService.deleteInsurance(insurance.id!).subscribe({
            next: () => {
              this.getInsurancesForVehicle(this.vehicleIdSelected as string);
              this.snackBarService.openSnackBar('Ubezpieczenie usunięte pomyślnie', SnackBarType.SUCCESS);
            },
            error: () => this.snackBarService.openSnackBar('Ubezpieczenie nie zostało usunięte', SnackBarType.ERROR)
          });
        }
      }
    });
  }

}
