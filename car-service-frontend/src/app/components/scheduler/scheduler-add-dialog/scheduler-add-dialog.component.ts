import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {SchedulerAddDialogFormService} from './scheduler-add-dialog-form.service';
import {Vehicle} from '../../../models/vehicle.model';
import {VehicleService} from '../../../services/vehicle.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'scheduler-add-dialog',
  templateUrl: './scheduler-add-dialog.component.html',
  styleUrls: ['./scheduler-add-dialog.component.scss']
})
export class SchedulerAddDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  vehicles: Vehicle[] = [];
  notifySubscription: Subscription = new Subscription();

  constructor(private dialogRef: MatDialogRef<any>,
              private formService: SchedulerAddDialogFormService,
              private vehicleService: VehicleService,
              @Inject(MAT_DIALOG_DATA) private day: string) {
    this.form = this.formService.getFormGroup(day);
  }

  ngOnInit() {
    this.getVehicles();
    this.startNotifySubscription();
  }

  ngOnDestroy() {
    this.notifySubscription.unsubscribe();
  }

  getVehicles() {
    this.vehicleService.getMyVehicles().subscribe({
      next: (vehicles) => this.vehicles = vehicles,
      error: () => this.vehicles = []
    });
  }

  startNotifySubscription() {
    this.notifySubscription = this.formService.getNotifyControl(this.form).valueChanges.subscribe({
      next: (value) => {
        const notifyTimeBeforeControl = this.formService.getNotifyTimeBeforeControl(this.form);
        if (value) {
          notifyTimeBeforeControl.enable();
        } else {
          notifyTimeBeforeControl.setValue(null);
          notifyTimeBeforeControl.disable();
        }
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  addEvent() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.dialogRef.close(this.formService.convertFormToSchedulerEvent(this.form));
    }
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }
}
