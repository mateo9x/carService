import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';
import {Expension} from '../../models/expension.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensionApiService {
  EXPENSE_URL = APP_URL + API_PREFIX + '/expenses';

  constructor(private httpClient: HttpClient) {
  }

  saveExpension(expension: Expension, attachments: File[]) {
    const formData = new FormData();
    if (attachments && attachments.length > 0) {
      attachments.forEach((attachment) => formData.append('attachments', attachment));
    }
    formData.append('expension', new Blob([JSON.stringify(expension)], {type: 'application/json'}));
    return this.httpClient.post<Expension>(this.EXPENSE_URL, formData);
  }

  getExpensesByVehicleId(vehicleId: string) {
    return this.httpClient.get<Expension[]>(`${this.EXPENSE_URL}/vehicle/${vehicleId}`);
  }

  deleteExpension(id: string) {
    return this.httpClient.delete<void>(`${this.EXPENSE_URL}/${id}`);
  }
}
