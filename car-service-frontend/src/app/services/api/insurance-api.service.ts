import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';
import {Insurance} from '../../models/insurance.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceApiService {
  INSURANCE_URL = APP_URL + API_PREFIX + '/insurances';

  constructor(private httpClient: HttpClient) {
  }

  saveInsurance(insurance: Insurance) {
    return this.httpClient.post<Insurance>(this.INSURANCE_URL, insurance);
  }

  getInsurancesByVehicleId(vehicleId: string) {
    return this.httpClient.get<Insurance[]>(`${this.INSURANCE_URL}/vehicle/${vehicleId}`);
  }
}
