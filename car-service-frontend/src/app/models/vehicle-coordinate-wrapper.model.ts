import {VehicleCoordinate} from "./vehicle-coordinate.model";

export class VehicleCoordinateWrapper {
  vehicleName: string;
  data: VehicleCoordinate[];

  constructor(vehicleName: string, data: VehicleCoordinate[]) {
    this.vehicleName = vehicleName;
    this.data = data;
  }
}
