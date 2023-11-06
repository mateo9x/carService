import {Injectable} from '@angular/core';
import {InspectionApiService} from './api/inspection-api.service';
import {Inspection} from '../models/inspection.model';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  constructor(private apiService: InspectionApiService) {
  }

  saveInspection(inspection: Inspection) {
    return this.apiService.saveInspection(inspection);
  }

  getInspectionsByVehicleId(id: string) {
    return this.apiService.getInspectionsByVehicleId(id);
  }

  deleteInspection(id: string) {
    return this.apiService.deleteInspection(id);
  }
}
