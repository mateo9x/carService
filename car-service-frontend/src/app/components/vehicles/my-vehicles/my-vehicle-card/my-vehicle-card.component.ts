import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Vehicle} from '../../../../models/vehicle.model';
import {DictionaryService, DictionaryType} from '../../../../services/dictionary.service';

@Component({
  selector: 'my-vehicle-card',
  templateUrl: './my-vehicle-card.component.html',
  styleUrls: ['./my-vehicle-card.component.scss']
})
export class MyVehicleCardComponent {
  @Input()
  vehicle: Vehicle | null = null;

  @Output()
  deleteVehicleEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  editVehicleDialogEmitter: EventEmitter<Vehicle> = new EventEmitter<Vehicle>();

  constructor(private dictionaryService: DictionaryService) {
  }

  editVehicleDialog() {
    this.editVehicleDialogEmitter.emit(this.vehicle as Vehicle);
  }

  deleteVehicle(id: string | undefined) {
    this.deleteVehicleEmitter.emit(id as string);
  }

  getDictionaryLabel(value: string, type: DictionaryType) {
    return this.dictionaryService.getDictionary(type)
      .filter((dic) => dic.value === value)
      .map((dic) => dic.label);
  }

  protected readonly DictionaryType = DictionaryType;
}
