import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {VehicleAddDialogFormService} from './vehicle-add-dialog-form.service';
import {MatDialogRef} from '@angular/material/dialog';
import {DictionaryService, DictionaryType} from '../../../services/dictionary.service';

@Component({
  selector: 'vehicle-add-dialog',
  templateUrl: './vehicle-add-dialog.component.html',
  styleUrls: ['./vehicle-add-dialog.component.scss']
})
export class VehicleAddDialogComponent {
  form: FormGroup;
  todayDate = new Date();
  engineTypes = this.getDictionary(DictionaryType.ENGINE_TYPES);
  transmissionTypes = this.getDictionary(DictionaryType.TRANSMISSION_TYPES);

  constructor(private dialogRef: MatDialogRef<any>,
              private formService: VehicleAddDialogFormService,
              private dictionaryService: DictionaryService) {
    this.form = this.formService.getFormGroup();
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
    return this.dictionaryService.getDictionary(type);
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }
}
