import {Injectable} from '@angular/core';
import {InsuranceApiService} from './api/insurance-api.service';
import {Insurance} from '../models/insurance.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  constructor(private apiService: InsuranceApiService) {
  }

  saveInsurance(insurance: Insurance) {
    return this.apiService.saveInsurance(insurance);
  }

  getInsurancesByVehicleId(id: string) {
    return this.apiService.getInsurancesByVehicleId(id);
  }
}
