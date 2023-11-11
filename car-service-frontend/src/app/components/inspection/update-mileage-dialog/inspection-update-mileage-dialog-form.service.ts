import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Vehicle} from '../../../models/vehicle.model';
import {DateService} from '../../../util/services/date.service';
import {Inspection} from '../../../models/inspection.model';

@Injectable({
  providedIn: 'root'
})
export class InspectionUpdateMileageDialogFormService {

  constructor(private fb: FormBuilder,
              private dateService: DateService) {
  }

  getFormGroup(vehicle: Vehicle): FormGroup {
    return this.fb.group({
      vehicleId: [vehicle.id as string, [Validators.required]],
      brand: [{value: vehicle.brand, disabled: true}, [Validators.required]],
      model: [{value: vehicle.model, disabled: true}, [Validators.required]],
      licensePlate: [{value: vehicle.licensePlate, disabled: true}, [Validators.required]],
      currentMileage: [null, [Validators.required]]
    });
  }

  convertFormToInspectionRequest(form: FormGroup): Inspection {
    const vehicleId = this.getVehicleId(form).value;
    const currentMileage = this.getCurrentMileageControl(form).value;
    const date = this.dateService.convertDateToJavaLocalDate(new Date()) as string;
    return new Inspection(vehicleId, date, false, false, '', false, false, false, false, '', currentMileage, 0);
  }

  getVehicleId(form: FormGroup): AbstractControl {
    return form.get('vehicleId') as AbstractControl;
  }

  getCurrentMileageControl(form: FormGroup): AbstractControl {
    return form.get('currentMileage') as AbstractControl;
  }

}
