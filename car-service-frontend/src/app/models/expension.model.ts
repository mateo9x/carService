export class Expension {
  id?: string;
  vehicleId: string;
  date: string;
  info: string;
  amount: number;
  attachmentsNames?: string[];


  constructor(vehicleId: string, date: string, info: string, amount: number, attachmentsNames?: string[], id?: string) {
    this.id = id;
    this.vehicleId = vehicleId;
    this.date = date;
    this.info = info;
    this.amount = amount;
    this.attachmentsNames = attachmentsNames;
  }
}
