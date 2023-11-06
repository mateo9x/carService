export class Insurance {
  id?: string;
  vehicleId: string;
  dateFrom: string;
  dateTo: string;
  company: string;
  loanPartsAmount: number;
  paymentDeadlines: string[];
  assistance: boolean;
  ac: boolean;
  acProtectionTypes: string[];

  constructor(vehicleId: string, dateFrom: string, dateTo: string, company: string, loanPartsAmount: number, paymentDeadlines: string[], assistance: boolean, ac: boolean, acProtectionTypes: string[], id?: string) {
    this.id = id;
    this.vehicleId = vehicleId;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.company = company;
    this.loanPartsAmount = loanPartsAmount;
    this.paymentDeadlines = paymentDeadlines;
    this.assistance = assistance;
    this.ac = ac;
    this.acProtectionTypes = acProtectionTypes;
  }
}
