export class Inspection {
  id?: string;
  vehicleId: string;
  date: string;
  oilChanged: boolean;
  oilFilterChanged: boolean;
  oilType: string;
  fuelFilterChanged: boolean;
  sparkPlugChanged: boolean;
  airFilterChanged: boolean;
  cabinFilterChanged: boolean;
  additionalInfo: string;
  currentMileage: number;
  nextServiceMileage: number;

  constructor(vehicleId: string, date: string, oilChanged: boolean, oilFilterChanged: boolean, oilType: string, fuelFilterChanged: boolean, sparkPlugChanged: boolean, airFilterChanged: boolean, cabinFilterChanged: boolean, additionalInfo: string, currentMileage: number, nextServiceMileage: number, id?: string) {
    this.id = id;
    this.vehicleId = vehicleId;
    this.date = date;
    this.oilChanged = oilChanged;
    this.oilFilterChanged = oilFilterChanged;
    this.oilType = oilType;
    this.fuelFilterChanged = fuelFilterChanged;
    this.sparkPlugChanged = sparkPlugChanged;
    this.airFilterChanged = airFilterChanged;
    this.cabinFilterChanged = cabinFilterChanged;
    this.additionalInfo = additionalInfo;
    this.currentMileage = currentMileage;
    this.nextServiceMileage = nextServiceMileage;
  }
}
