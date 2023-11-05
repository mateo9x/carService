import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {VehicleEditDialogFormService} from './vehicle-edit-dialog-form.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DictionaryService, DictionaryType} from '../../../services/dictionary.service';
import {Vehicle} from '../../../models/vehicle.model';

@Component({
  selector: 'vehicle-edit-dialog',
  templateUrl: './vehicle-edit-dialog.component.html',
  styleUrls: ['./vehicle-edit-dialog.component.scss']
})
export class VehicleEditDialogComponent implements OnInit {
  form: FormGroup;
  todayDate = new Date();
  engineTypes = this.getDictionary(DictionaryType.ENGINE_TYPES);
  transmissionTypes = this.getDictionary(DictionaryType.TRANSMISSION_TYPES);

  constructor(private dialogRef: MatDialogRef<any>,
              private formService: VehicleEditDialogFormService,
              private dictionaryService: DictionaryService,
              @Inject(MAT_DIALOG_DATA) private vehicle: Vehicle) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit() {
    this.formService.convertVehicleToForm(this.form, this.vehicle);
  }

  cancel() {
    this.dialogRef.close();
  }

  updateVehicle() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.dialogRef.close(this.formService.convertFormToVehicleRequest(this.form));
    }
  }

  getDictionary(type: DictionaryType) {
    return this.dictionaryService.getDictionary(type);
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
