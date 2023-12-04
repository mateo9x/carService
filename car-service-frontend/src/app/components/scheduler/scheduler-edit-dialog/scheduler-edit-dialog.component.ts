import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {SchedulerEditDialogFormService} from './scheduler-edit-dialog-form.service';
import {Vehicle} from '../../../models/vehicle.model';
import {VehicleService} from '../../../services/vehicle.service';
import {Subscription} from 'rxjs';
import {SchedulerEvent} from '../../../models/scheduler-event.model';

@Component({
  selector: 'scheduler-edit-dialog',
  templateUrl: './scheduler-edit-dialog.component.html',
  styleUrls: ['./scheduler-edit-dialog.component.scss']
})
export class SchedulerEditDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  vehicles: Vehicle[] = [];
  notifySubscription: Subscription = new Subscription();

  constructor(private dialogRef: MatDialogRef<any>,
              private formService: SchedulerEditDialogFormService,
              private vehicleService: VehicleService,
              @Inject(MAT_DIALOG_DATA) private schedulerEvent: SchedulerEvent) {
    this.form = this.formService.getFormGroup(schedulerEvent);
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

  updateEvent() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.dialogRef.close(this.formService.convertFormToSchedulerEvent(this.form));
    }
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }
}
