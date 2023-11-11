import {Injectable} from '@angular/core';
import {InspectionApiService} from './api/inspection-api.service';
import {Inspection} from '../models/inspection.model';
import {
  InspectionUpdateMileageDialogComponent
} from '../components/inspection/update-mileage-dialog/inspection-update-mileage-dialog.component';
import {filter} from 'rxjs';
import {SnackBarService, SnackBarType} from '../util/services/snack-bar.service';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  constructor(private apiService: InspectionApiService,
              private dialog: MatDialog,
              private snackBarService: SnackBarService) {
  }

  saveInspection(inspection: Inspection) {
    return this.apiService.saveInspection(inspection);
  }

  getInspectionsByVehicleId(id: string) {
    return this.apiService.getInspectionsByVehicleId(id);
  }

  deleteInspection(id: string) {
    return this.apiService.deleteInspection(id);
  }

  updateMileageForVehicles() {
    const dialogRef = this.dialog.open(InspectionUpdateMileageDialogComponent, {
      autoFocus: false,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed()
      .pipe(
        filter((data) => data)
      )
      .subscribe({
        next: (data) => {
          const inspections = data as Inspection[];
          inspections.forEach((inspection) =>
            this.saveInspection(inspection).subscribe({
              next: () => {
                this.snackBarService.openSnackBar('Przebieg został zaktualizowany', SnackBarType.SUCCESS);
              },
              error: (error) => {
                if (error.error) {
                  this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
                } else {
                  this.snackBarService.openSnackBar('Przebieg nie został zaktualizowany', SnackBarType.ERROR);
                }
              }
            }));
        }
      });
  }
}
