import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {UserPreferences} from '../../../models/user-preferences.model';

@Injectable({
  providedIn: 'root'
})
export class PreferencesFormService {

  constructor(private fb: FormBuilder) {
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      notifyInsurance: [false, []],
      daysBeforeInsuranceExpire: [null, []],
      notifyInspections: [false, []],
      mileageBeforeInspectionExpire: [null, []]
    });
  }

  fillForm(form: FormGroup, userPreferences: UserPreferences) {
    this.getNotifyInsuranceControl(form).setValue(userPreferences.notifyInsurance);
    this.getDaysBeforeInsuranceExpireControl(form).setValue(userPreferences.daysBeforeInsuranceExpire);
    this.getNotifyInspectionsControl(form).setValue(userPreferences.notifyInspections);
    this.getMileageBeforeInspectionExpireControl(form).setValue(userPreferences.mileageBeforeInspectionExpire);
  }

  convertFormToUserPreferences(form: FormGroup): UserPreferences {
    const notifyInsurance = this.getNotifyInsuranceControl(form).value;
    const daysBeforeInsuranceExpire = this.getDaysBeforeInsuranceExpireControl(form).value;
    const notifyInspections = this.getNotifyInspectionsControl(form).value;
    const mileageBeforeInspectionExpire = this.getDaysBeforeInsuranceExpireControl(form).value;
    return new UserPreferences(notifyInsurance, daysBeforeInsuranceExpire, notifyInspections, mileageBeforeInspectionExpire);
  }

  getNotifyInsuranceControl(form: FormGroup) {
    return form.get('notifyInsurance') as AbstractControl;
  }

  getDaysBeforeInsuranceExpireControl(form: FormGroup) {
    return form.get('daysBeforeInsuranceExpire') as AbstractControl;
  }

  getNotifyInspectionsControl(form: FormGroup) {
    return form.get('notifyInspections') as AbstractControl;
  }

  getMileageBeforeInspectionExpireControl(form: FormGroup) {
    return form.get('mileageBeforeInspectionExpire') as AbstractControl;
  }
}
