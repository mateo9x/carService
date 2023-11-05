export class Vehicle {
  id?: string;
  brand: string;
  model: string;
  productionYear: number;
  licensePlate: string;
  vin: string;
  purchaseDate: string;
  engineType: string;
  transmissionType: string;
  purchaseMileage: number;

  constructor(brand: string, model: string, productionYear: number, licensePlate: string, vin: string, purchaseDate: string, engineType: string, transmissionType: string, purchaseMileage: number, id?: string) {
    this.brand = brand;
    this.model = model;
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
