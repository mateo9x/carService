import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../../../services/vehicle.service';
import {Vehicle} from '../../../models/vehicle.model';
import {MatDialog} from '@angular/material/dialog';
import {filter} from 'rxjs';
import {SnackBarService, SnackBarType} from '../../../services/util/snack-bar.service';
import {InspectionService} from '../../../services/inspection.service';
import {Inspection} from '../../../models/inspection.model';
import {InspectionAddDialogComponent} from '../add-dialog/inspection-add-dialog.component';

@Component({
  selector: 'my-inspections',
  templateUrl: './my-inspections.component.html',
  styleUrls: ['./my-inspections.component.scss']
})
export class MyInspectionsComponent implements OnInit {
  inspections: Inspection[] = [];
  vehicles: Vehicle[] = [];
  vehicleIdSelected: string | null = null;

  constructor(private vehicleService: VehicleService,
              private inspectionService: InspectionService,
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

  getInspectionsForVehicle(vehicleId: string) {
    this.vehicleIdSelected = vehicleId;
    this.inspectionService.getInspectionsByVehicleId(vehicleId).subscribe({
      next: (inspections) => this.inspections = inspections
    });
  }

  addInspection(vehicleId: string | null) {
    if (vehicleId) {
      const dialogRef = this.dialog.open(InspectionAddDialogComponent, {
        autoFocus: false,
        maxHeight: '90vh',
        data: vehicleId
      });
      dialogRef.afterClosed()
        .pipe(
          filter((data) => data)
        )
        .subscribe({
          next: (data) => this.inspectionService.saveInspection(data).subscribe({
            next: () => {
              this.snackBarService.openSnackBar('Przegląd dodany pomyślnie', SnackBarType.SUCCESS);
              this.getInspectionsForVehicle(vehicleId);
            },
            error: (error) => {
              if (error.error) {
                this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
              } else {
                this.snackBarService.openSnackBar('Przegląd nie został dodany', SnackBarType.ERROR);
              }
            }
          })
        });
    }
  }

  deleteInspection(id: string) {
    this.inspectionService.deleteInspection(id).subscribe({
      next: () => {
        this.getInspectionsForVehicle(this.vehicleIdSelected as string);
        this.snackBarService.openSnackBar('Przegląd usunięty pomyślnie', SnackBarType.SUCCESS);
      },
      error: () => this.snackBarService.openSnackBar('Przegląd nie został usunięty', SnackBarType.ERROR)
    });
  }

}
