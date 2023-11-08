import {Injectable} from '@angular/core';
import {ExpensionApiService} from './api/expense-api.service';
import {Expension} from '../models/expension.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensionService {
  constructor(private apiService: ExpensionApiService) {
  }

  saveExpension(expense: Expension, attachments: File[]) {
    return this.apiService.saveExpension(expense, attachments);
  }

  getExpensesByVehicleId(id: string) {
    return this.apiService.getExpensesByVehicleId(id);
  }

  deleteExpension(id: string) {
    return this.apiService.deleteExpension(id);
  }
}
