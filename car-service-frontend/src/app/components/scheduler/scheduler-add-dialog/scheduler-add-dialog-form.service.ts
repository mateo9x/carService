import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateService} from '../../../util/services/date.service';
import {SchedulerEvent} from '../../../models/scheduler-event.model';
import {schedulerTimeValidator} from '../validators/scheduler-time.validator';

@Injectable({
  providedIn: 'root'
})
export class SchedulerAddDialogFormService {

  constructor(private fb: FormBuilder,
              private dateService: DateService) {
  }

  getFormGroup(day: string): FormGroup {
    return this.fb.group({
      vehicleId: [null, [Validators.required]],
      day: [{value: day, disabled: true}, [Validators.required]],
      time: [null, [Validators.required, schedulerTimeValidator]],
      info: [null, [Validators.required]],
      notify: [false, [Validators.required]],
      notifyTimeBefore: [{value: null, disabled: true}, [Validators.required, Validators.min(0)]]
    });
  }

  convertFormToSchedulerEvent(form: FormGroup): SchedulerEvent {
    const vehicleId = this.getVehicleIdControl(form).value;
    const day = this.dateService.convertDateToJavaLocalDate(this.getDayControl(form).value) as string;
    const time = this.getTimeControl(form).value;
    const info = this.getInfoControl(form).value;
    const notify = this.getNotifyControl(form).value;
    let notifyTimeBefore = this.getNotifyTimeBeforeControl(form).value;
    return new SchedulerEvent(vehicleId, day, time, info, notify, notifyTimeBefore);
  }

  getVehicleIdControl(form: FormGroup): AbstractControl {
    return form.get('vehicleId') as AbstractControl;
  }

  getDayControl(form: FormGroup): AbstractControl {
    return form.get('day') as AbstractControl;
  }

  getTimeControl(form: FormGroup): AbstractControl {
    return form.get('time') as AbstractControl;
  }

  getInfoControl(form: FormGroup): AbstractControl {
    return form.get('info') as AbstractControl;
  }

  getNotifyControl(form: FormGroup): AbstractControl {
    return form.get('notify') as AbstractControl;
  }

  getNotifyTimeBeforeControl(form: FormGroup): AbstractControl {
    return form.get('notifyTimeBefore') as AbstractControl;
  }

}
