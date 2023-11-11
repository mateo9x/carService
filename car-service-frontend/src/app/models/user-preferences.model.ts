export class UserPreferences {
  id?: string;
  userId?: string;
  notifyInsurance: boolean;
  daysBeforeInsuranceExpire: number;
  notifyInspections: boolean;
  mileageBeforeInspectionExpire: number;


  constructor(notifyInsurance: boolean, daysBeforeInsuranceExpire: number, notifyInspections: boolean, mileageBeforeInspectionExpire: number, userId?: string, id?: string) {
    this.id = id;
    this.userId = userId;
    this.notifyInsurance = notifyInsurance;
    this.daysBeforeInsuranceExpire = daysBeforeInsuranceExpire;
    this.notifyInspections = notifyInspections;
    this.mileageBeforeInspectionExpire = mileageBeforeInspectionExpire;
  }
}
