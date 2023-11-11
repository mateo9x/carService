import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateService} from '../../../util/services/date.service';
import {Insurance} from '../../../models/insurance.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceAddDialogFormService {

  constructor(private fb: FormBuilder,
              private dateService: DateService) {
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      dateFrom: [null, [Validators.required]],
      dateTo: [{value: null, disabled: true}, [Validators.required]],
      company: [null, [Validators.required]],
      loanPartsAmount: [null, [Validators.required]],
      assistance: [false, [Validators.required]],
      ac: [false, [Validators.required]],
      acProtectionTypes: [null, []]
    });
  }

  convertFormToInsuranceRequest(form: FormGroup, vehicleId: string): Insurance {
    const dateFrom = this.dateService.convertDateToJavaLocalDate(this.getDateFromControl(form).value) as string;
    const dateTo = this.dateService.convertDateToJavaLocalDate(this.getDateToControl(form).value) as string;
    const company = this.getCompanyControl(form).value as string;
    const loanPartsAmount = this.getLoanPartsAmountControl(form).value;
    const paymentDeadlines = [''];
    const assistance = this.getAssistanceControl(form).value;
    const ac = this.getAcControl(form).value;
    const acProtectionTypes = this.getAcProtectionTypesControl(form).value;
    return new Insurance(vehicleId, dateFrom, dateTo, company, loanPartsAmount, paymentDeadlines, assistance, ac, acProtectionTypes);
  }

  getDateFromControl(form: FormGroup): AbstractControl {
    return form.get('dateFrom') as AbstractControl;
  }

  getDateToControl(form: FormGroup): AbstractControl {
    return form.get('dateTo') as AbstractControl;
  }

  getCompanyControl(form: FormGroup): AbstractControl {
    return form.get('company') as AbstractControl;
  }

  getLoanPartsAmountControl(form: FormGroup): AbstractControl {
    return form.get('loanPartsAmount') as AbstractControl;
  }

  getAssistanceControl(form: FormGroup): AbstractControl {
    return form.get('assistance') as AbstractControl;
  }

  getAcControl(form: FormGroup): AbstractControl {
    return form.get('ac') as AbstractControl;
  }

  getAcProtectionTypesControl(form: FormGroup): AbstractControl {
    return form.get('acProtectionTypes') as AbstractControl;
  }

}
