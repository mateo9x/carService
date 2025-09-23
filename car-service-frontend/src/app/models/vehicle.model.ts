export class Vehicle {
  id?: string;
  make: string;
  name: string;
  productionYear: number;
  licensePlate: string;
  vin: string;
  purchaseDate: string;
  engineType: string;
  transmissionType: string;
  purchaseMileage: number;
  active?: boolean;
  attachmentsNames?: string[];
  attachmentsUri?: any[];

  constructor(make: string, name: string, productionYear: number, licensePlate: string, vin: string, purchaseDate: string, engineType: string, transmissionType: string, purchaseMileage: number, id?: string) {
    this.make = make;
    this.name = name;
    this.productionYear = productionYear;
    this.licensePlate = licensePlate;
    this.vin = vin;
    this.purchaseDate = purchaseDate;
    this.engineType = engineType;
    this.transmissionType = transmissionType;
    this.purchaseMileage = purchaseMileage
    this.id = id;
  }
}
