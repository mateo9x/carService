import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InsuranceAddDialogFormService} from './insurance-add-dialog-form.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DictionaryService, DictionaryType} from '../../../services/dictionary.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'insurance-add-dialog',
  templateUrl: './insurance-add-dialog.component.html',
  styleUrls: ['./insurance-add-dialog.component.scss']
})
export class InsuranceAddDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  companies = this.getDictionary(DictionaryType.INSURANCE_COMPANIES);
  acProtectionTypes = this.getDictionary(DictionaryType.AC_PROTECTION_TYPES);
  loanPartsAmounts = this.getDictionary(DictionaryType.LOAN_PARTS_AMOUNT);
  acSubscription: Subscription = new Subscription();

  constructor(private dialogRef: MatDialogRef<any>,
              private formService: InsuranceAddDialogFormService,
              private dictionaryService: DictionaryService,
              @Inject(MAT_DIALOG_DATA) private vehicleId: string) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit() {
    this.startAcSubscription();
  }

  ngOnDestroy() {
    this.acSubscription.unsubscribe();
  }

  startAcSubscription() {
   this.acSubscription = this.formService.getAcControl(this.form).valueChanges.subscribe({
     next: (value) => {
       const acProtectionTypesControl = this.formService.getAcProtectionTypesControl(this.form);
      if (value) {
        acProtectionTypesControl.enable();
      } else {
        acProtectionTypesControl.setValue(null);
        acProtectionTypesControl.disable();
      }
     }
   });
  }

  cancel() {
    this.dialogRef.close();
  }

  addInsurance() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.dialogRef.close(this.formService.convertFormToInsuranceRequest(this.form, this.vehicleId));
    }
  }

  getDictionary(type: DictionaryType) {
    return this.dictionaryService.getDictionary(type);
  }

  setDateTo() {
    const newDateTo = new Date(this.formService.getDateFromControl(this.form).value);
    newDateTo.setFullYear(newDateTo.getFullYear() + 1, newDateTo.getMonth(), newDateTo.getDate());
    const dateToControl = this.formService.getDateToControl(this.form);
    dateToControl.setValue(newDateTo)
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }
}
