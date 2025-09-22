import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {VehicleAddDialogFormService} from './vehicle-add-dialog-form.service';
import {MatDialogRef} from '@angular/material/dialog';
import {DictionaryService, DictionaryType} from '../../../services/dictionary.service';

@Component({
  selector: 'vehicle-add-dialog',
  templateUrl: './vehicle-add-dialog.component.html',
  styleUrls: ['./vehicle-add-dialog.component.scss']
})
export class VehicleAddDialogComponent implements OnInit {
  form: FormGroup;
  todayDate = new Date();
  engineTypes = this.getDictionary(DictionaryType.ENGINE_TYPES);
  transmissionTypes = this.getDictionary(DictionaryType.TRANSMISSION_TYPES);
  vehicleBrands: any[] = [];

  constructor(private dialogRef: MatDialogRef<any>,
              private formService: VehicleAddDialogFormService,
              private dictionaryService: DictionaryService) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit() {
    this.dictionaryService.getCachedDictionary('brands').subscribe((values) => this.vehicleBrands = values)
  }

  cancel() {
    this.dialogRef.close();
  }

  addVehicle() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.dialogRef.close(this.formService.convertFormToVehicleRequest(this.form));
    }
  }

  getDictionary(type: DictionaryType) {
    return this.dictionaryService.getDictEntry(type);
  }

  getMinPurchaseDate() {
    let date = new Date();
    const minYear = this.formService.getProductionYearControl(this.form).value;
    date.setUTCFullYear(minYear, 0, 1);
    return date;
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }
}
