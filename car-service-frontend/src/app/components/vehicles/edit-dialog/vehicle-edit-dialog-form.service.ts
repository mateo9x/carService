import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Vehicle} from '../../../models/vehicle.model';
import {DateService} from '../../../util/services/date.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleEditDialogFormService {

  constructor(private fb: FormBuilder,
              private dateService: DateService) {
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      id: [null, [Validators.required]],
      brand: [null, [Validators.required, Validators.maxLength(100)]],
      model: [null, [Validators.required, Validators.maxLength(100)]],
      productionYear: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      licensePlate: [null, [Validators.required, Validators.maxLength(100)]],
      vin: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      purchaseDate: [null, [Validators.required]],
      engineType: [null, [Validators.required, Validators.maxLength(100)]],
      transmissionType: [null, [Validators.required, Validators.maxLength(100)]],
      purchaseMileage: [null, [Validators.required, Validators.min(0)]]
    });
  }

  convertVehicleToForm(form: FormGroup, vehicle: Vehicle): void {
    this.getIdControl(form).setValue(vehicle.id);
    this.getBrandControl(form).setValue(vehicle.brand);
    this.getModelControl(form).setValue(vehicle.model);
    this.getProductionYearControl(form).setValue(vehicle.productionYear);
    this.getLicensePlateControl(form).setValue(vehicle.licensePlate);
    this.getVinControl(form).setValue(vehicle.vin);
    this.getPurchaseDateControl(form).setValue(vehicle.purchaseDate);
    this.getEngineTypeControl(form).setValue(vehicle.engineType);
    this.getTransmissionType(form).setValue(vehicle.transmissionType);
    this.getPurchaseMileageControl(form).setValue(vehicle.purchaseMileage);
  }

  convertFormToVehicleRequest(form: FormGroup): Vehicle {
    const id = this.getIdControl(form).value;
    const brand = this.getBrandControl(form).value;
    const model = this.getModelControl(form).value;
    const productionYear = this.getProductionYearControl(form).value;
    let licensePlate = this.getLicensePlateControl(form).value as string;
    licensePlate = licensePlate.toUpperCase();
    let vin = this.getVinControl(form).value as string;
    vin = vin.toUpperCase();
    const purchaseDate = this.dateService.convertDateToJavaLocalDate(this.getPurchaseDateControl(form).value) as string;
    const engineType = this.getEngineTypeControl(form).value;
    const transmissionType = this.getTransmissionType(form).value;
    const purchaseMileage = this.getPurchaseMileageControl(form).value;
    return new Vehicle(brand, model, productionYear, licensePlate, vin, purchaseDate, engineType, transmissionType, purchaseMileage, id);
  }

  getIdControl(form: FormGroup): AbstractControl {
    return form.get('id') as AbstractControl;
  }

  getBrandControl(form: FormGroup): AbstractControl {
    return form.get('brand') as AbstractControl;
  }

  getModelControl(form: FormGroup): AbstractControl {
    return form.get('model') as AbstractControl;
  }

  getProductionYearControl(form: FormGroup): AbstractControl {
    return form.get('productionYear') as AbstractControl;
  }

  getLicensePlateControl(form: FormGroup): AbstractControl {
    return form.get('licensePlate') as AbstractControl;
  }

  getVinControl(form: FormGroup): AbstractControl {
    return form.get('vin') as AbstractControl;
  }

  getPurchaseDateControl(form: FormGroup): AbstractControl {
    return form.get('purchaseDate') as AbstractControl;
  }

  getEngineTypeControl(form: FormGroup): AbstractControl {
    return form.get('engineType') as AbstractControl;
  }

  getTransmissionType(form: FormGroup): AbstractControl {
    return form.get('transmissionType') as AbstractControl;
  }

  getPurchaseMileageControl(form: FormGroup): AbstractControl {
    return form.get('purchaseMileage') as AbstractControl;
  }

}
