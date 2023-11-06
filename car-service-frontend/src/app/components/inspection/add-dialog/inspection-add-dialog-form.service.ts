import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateService} from '../../../services/util/date.service';
import {Inspection} from '../../../models/inspection.model';

@Injectable({
  providedIn: 'root'
})
export class InspectionAddDialogFormService {

  constructor(private fb: FormBuilder,
              private dateService: DateService) {
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      date: [null, [Validators.required]],
      oilChanged: [false, []],
      oilFilterChanged: [false, []],
      oilType: [{value: null, disabled: true}, []],
      fuelFilterChanged: [false, []],
      sparkPlugChanged: [false, []],
      airFilterChanged: [false, []],
      cabinFilterChanged: [false, []],
      additionalInfo: [null, []],
      currentMileage: [null, [Validators.required]],
      nextServiceMileage: [null, [Validators.required]]
    });
  }

  convertFormToInspectionRequest(form: FormGroup, vehicleId: string): Inspection {
    const date = this.dateService.convertDateToJavaLocalDate(this.getDateControl(form).value) as string;
    const oilChanged = this.getOilChangedControl(form).value;
    const oilFilterChanged = this.getOilFilterChangedControl(form).value;
    const oilType = this.getOilTypeControl(form).value;
    const fuelFilterChanged = this.getFuelFilterChangedControl(form).value;
    const sparkPlugChanged = this.getSparkPlugChangedControl(form).value;
    const airFilterChanged = this.getAirFilterChangedControl(form).value;
    const cabinFilterChanged = this.getCabinFilterChangedControl(form).value;
    const additionalInfo = this.getAdditionalInfoControl(form).value;
    const currentMileage = this.getCurrentMileageControl(form).value;
    const nextServiceMileage = this.getNextServiceMileageControl(form).value;
    return new Inspection(vehicleId, date, oilChanged, oilFilterChanged, oilType, fuelFilterChanged, sparkPlugChanged, airFilterChanged, cabinFilterChanged, additionalInfo, currentMileage, nextServiceMileage);
  }

  getDateControl(form: FormGroup): AbstractControl {
    return form.get('date') as AbstractControl;
  }

  getOilChangedControl(form: FormGroup): AbstractControl {
    return form.get('oilChanged') as AbstractControl;
  }

  getOilFilterChangedControl(form: FormGroup): AbstractControl {
    return form.get('oilFilterChanged') as AbstractControl;
  }

  getOilTypeControl(form: FormGroup): AbstractControl {
    return form.get('oilType') as AbstractControl;
  }

  getFuelFilterChangedControl(form: FormGroup): AbstractControl {
    return form.get('fuelFilterChanged') as AbstractControl;
  }

  getSparkPlugChangedControl(form: FormGroup): AbstractControl {
    return form.get('sparkPlugChanged') as AbstractControl;
  }

  getAirFilterChangedControl(form: FormGroup): AbstractControl {
    return form.get('airFilterChanged') as AbstractControl;
  }

  getCabinFilterChangedControl(form: FormGroup): AbstractControl {
    return form.get('cabinFilterChanged') as AbstractControl;
  }

  getAdditionalInfoControl(form: FormGroup): AbstractControl {
    return form.get('additionalInfo') as AbstractControl;
  }

  getCurrentMileageControl(form: FormGroup): AbstractControl {
    return form.get('currentMileage') as AbstractControl;
  }

  getNextServiceMileageControl(form: FormGroup): AbstractControl {
    return form.get('nextServiceMileage') as AbstractControl;
  }

}
