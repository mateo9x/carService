import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InspectionAddDialogFormService} from './inspection-add-dialog-form.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'inspection-add-dialog',
  templateUrl: './inspection-add-dialog.component.html',
  styleUrls: ['./inspection-add-dialog.component.scss']
})
export class InspectionAddDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  oilChangedSubscription: Subscription = new Subscription();
  nextServiceMileageSubscription: Subscription = new Subscription();
  currentMileageSubscription: Subscription = new Subscription();

  constructor(private dialogRef: MatDialogRef<any>,
              private formService: InspectionAddDialogFormService,
              @Inject(MAT_DIALOG_DATA) private vehicleId: string) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit() {
    this.startOilChangedSubscription();
    this.startCurrentMileageSubscription();
    this.startNextServiceMileageSubscription();
  }

  ngOnDestroy() {
    this.oilChangedSubscription.unsubscribe();
    this.nextServiceMileageSubscription.unsubscribe();
    this.currentMileageSubscription.unsubscribe();
  }

  startOilChangedSubscription() {
    this.oilChangedSubscription = this.formService.getOilChangedControl(this.form).valueChanges.subscribe({
      next: (value) => {
        const oilTypeControl = this.formService.getOilTypeControl(this.form);
        if (!value) {
          oilTypeControl.setValue(null);
          oilTypeControl.disable();
        } else {
          oilTypeControl.enable();
        }
      }
    });
  }

  startCurrentMileageSubscription() {
    const currentMileageControl = this.formService.getCurrentMileageControl(this.form);
    this.currentMileageSubscription = currentMileageControl.valueChanges.subscribe({
      next: (value) => {
        const nextServiceMileageControl = this.formService.getNextServiceMileageControl(this.form);
        if ((nextServiceMileageControl.value && value) && value > nextServiceMileageControl.value) {
          nextServiceMileageControl.setErrors({valueTooLow: true});
        } else {
          nextServiceMileageControl.setErrors(null);
        }
      }
    });
  }

  startNextServiceMileageSubscription() {
    const nextServiceMileageControl = this.formService.getNextServiceMileageControl(this.form);
    this.nextServiceMileageSubscription = nextServiceMileageControl.valueChanges.subscribe({
      next: (value) => {
        const currentMileageControl = this.formService.getCurrentMileageControl(this.form);
        if ((currentMileageControl.value && value) && value < currentMileageControl.value) {
          nextServiceMileageControl.setErrors({valueTooLow: true});
        } else {
          nextServiceMileageControl.setErrors(null);
        }
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  addInspection() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.dialogRef.close(this.formService.convertFormToInspectionRequest(this.form, this.vehicleId));
    }
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }
}
