import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Vehicle} from '../../../models/vehicle.model';
import {VehicleService} from '../../../services/vehicle.service';
import {InspectionUpdateMileageDialogFormService} from './inspection-update-mileage-dialog-form.service';
import {Inspection} from '../../../models/inspection.model';

@Component({
  selector: 'inspection-update-mileage',
  templateUrl: './inspection-update-mileage-dialog.component.html',
  styleUrls: ['./inspection-update-mileage-dialog.component.scss']
})
export class InspectionUpdateMileageDialogComponent implements OnInit {
  forms: FormGroup[] = [];
  vehicles: Vehicle[] = [];

  constructor(private dialogRef: MatDialogRef<any>,
              private formService: InspectionUpdateMileageDialogFormService,
              private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.getMyVehicles();
  }

  getMyVehicles() {
    this.vehicleService.getMyVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        if (vehicles.length > 0) {
          vehicles.forEach((vehicle) => this.forms.push(this.formService.getFormGroup(vehicle)))
        }
      },
      error: () => this.vehicles = []
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  updateMileages() {
    this.forms.forEach((form) => form.markAllAsTouched());
    const anyInvalidForm = this.forms.find((form) => form.invalid);
    if (!anyInvalidForm) {
      let inspectionsToSave: Inspection[] = [];
      this.forms.forEach((form) => inspectionsToSave.push(this.formService.convertFormToInspectionRequest(form)));
      this.dialogRef.close(inspectionsToSave);
    }
  }

  getFormControl(form: FormGroup, controlName: string) {
    return form.controls[controlName] as FormControl;
  }

  hasFormError(form: FormGroup, controlName: string, errorName: string) {
    return form.get(controlName)?.hasError(errorName);
  }
}
