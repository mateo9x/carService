import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateService} from '../../../services/util/date.service';
import {Expension} from '../../../models/expension.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensionAddDialogFormService {

  constructor(private fb: FormBuilder,
              private dateService: DateService) {
  }

  getFormGroup(vehicleId: string): FormGroup {
    return this.fb.group({
      vehicleId: [vehicleId, [Validators.required]],
      date: [null, [Validators.required]],
      info: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(1)]]
    });
  }

  convertFormToExpensionRequest(form: FormGroup): Expension {
    const vehicleId = this.getVehicleIdControl(form).value;
    const date = this.dateService.convertDateToJavaLocalDate(this.getDateControl(form).value) as string;
    const info = this.getInfoControl(form).value;
    const amount = this.getAmountControl(form).value;
    return new Expension(vehicleId, date, info, amount);
  }

  getDateControl(form: FormGroup): AbstractControl {
    return form.get('date') as AbstractControl;
  }

  getVehicleIdControl(form: FormGroup): AbstractControl {
    return form.get('vehicleId') as AbstractControl;
  }

  getInfoControl(form: FormGroup): AbstractControl {
    return form.get('info') as AbstractControl;
  }

  getAmountControl(form: FormGroup): AbstractControl {
    return form.get('amount') as AbstractControl;
  }

}
