import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';

@Injectable({
  providedIn: 'root'
})
export class ReportApiService {
  REPORTS_URL = APP_URL + API_PREFIX + '/reports';

  constructor(private httpClient: HttpClient) {
  }

  generateReport(reportData: ReportData, reportType: string) {
    const requestOptions: Object = {
      responseType: 'blob'
    }
    return this.httpClient.post<any>(`${this.REPORTS_URL}/type/${reportType}`, reportData, requestOptions);
  }
}

export interface ReportData {
  vehicles: string[];
  reportRanges: string[];
  dateFrom: string;
  dateTo: string;
}
