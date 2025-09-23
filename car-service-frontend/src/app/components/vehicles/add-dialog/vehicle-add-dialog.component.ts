import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {VehicleAddDialogFormService} from './vehicle-add-dialog-form.service';
import {MatDialogRef} from '@angular/material/dialog';
import {DictionaryService, DictionaryType} from '../../../services/dictionary.service';
import {CacheType} from "../../cache/cache-type.enum";
import {CarMakeModel, CarNameModel} from "../../../models/brand-make.model";
import {forkJoin} from "rxjs";

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
  vehicleMakes: CarMakeModel[] = [];
  vehicleNames: CarNameModel[] = [];
  makeValue: string = '';

  constructor(private dialogRef: MatDialogRef<any>,
              private formService: VehicleAddDialogFormService,
              private dictionaryService: DictionaryService) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit() {
    forkJoin([
      this.dictionaryService.getCachedDictionary(CacheType.CAR_MAKES),
      this.dictionaryService.getCachedDictionary(CacheType.CAR_NAMES)
    ]).subscribe(([makes, names]: [CarMakeModel[], CarNameModel[]]) => {
      this.vehicleMakes = makes;
      this.vehicleNames = names;
    })
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

  onCarMakeChange(makeSelected: any) {
    this.makeValue = makeSelected?.value;
  }

  getCarNamesFiltered(): CarNameModel[] {
    if (this.makeValue?.length > 0) {
      const makeFound = this.vehicleMakes.find((make) => make.make === this.makeValue);
      return this.vehicleNames.filter((carName) => carName.makeId === makeFound?.makeId);
    }
    return this.vehicleNames;
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }
}
