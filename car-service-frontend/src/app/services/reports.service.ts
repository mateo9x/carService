import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
import {ReportApiService, ReportData} from './api/reports-api.service';
import {SpinnerService} from '../util/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private apiService: ReportApiService,
              private spinnerService: SpinnerService) {
  }

  generateReport(reportData: ReportData, reportType: string) {
    this.spinnerService.setLoading(true);
    this.apiService.generateReport(reportData, reportType).subscribe({
      next: (file) => {
        this.spinnerService.setLoading(false);
        const fileBlob = new Blob([file], {type: 'text/plain'});
        saveAs(fileBlob, 'raport.' + reportType.toLowerCase().trim());
      },
      error: () => this.spinnerService.setLoading(false)
    });
  }

}
