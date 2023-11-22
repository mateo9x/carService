import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
import {ReportApiService, ReportData} from './api/reports-api.service';
import {SpinnerService} from '../util/services/spinner.service';
import {BehaviorSubject} from 'rxjs';
import {SnackBarService, SnackBarType} from '../util/services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  generatingObserablve: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ReportApiService,
              private spinnerService: SpinnerService,
              private snackBarService: SnackBarService) {
  }

  generateReport(reportData: ReportData, reportType: string) {
    this.spinnerService.setLoading(true);
    this.generatingObserablve.next(true);
    this.apiService.generateReport(reportData, reportType).subscribe({
      next: (file) => {
        if (file.size > 0) {
          const fileBlob = new Blob([file], {type: 'text/plain'});
          saveAs(fileBlob, 'raport.' + reportType.toLowerCase().trim());
        } else {
          this.snackBarService.openSnackBar('Brak dostępnych danych dla wskazanych pojazdów w wybranym zakresie czasu', SnackBarType.WARN);
        }
        this.spinnerService.setLoading(false);
        this.generatingObserablve.next(false);
      },
      error: () => {
        this.snackBarService.openSnackBar('Nie udało wygenerować się raportu', SnackBarType.ERROR);
        this.spinnerService.setLoading(false);
        this.generatingObserablve.next(false);
      }
    });
  }

}
