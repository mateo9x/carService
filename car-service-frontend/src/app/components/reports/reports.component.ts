import {Component, OnDestroy, OnInit} from '@angular/core';
import {VehicleService} from '../../services/vehicle.service';
import {Vehicle} from '../../models/vehicle.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReportsService} from '../../services/reports.service';
import {ReportData} from '../../services/api/reports-api.service';
import {DateService} from '../../util/services/date.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  vehicles: Vehicle[] = [];
  reportTypes = ['XLSX', 'PDF'];
  reportRanges = [
    {label: 'Ubezpieczenie', value: 'INSURANCE'},
    {label: 'Przeglądy', value: 'INSPECTION'},
    {label: 'Wydatki', value: 'EXPENSION'}
  ];
  generating = false;
  generatingSubscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder,
              private vehicleService: VehicleService,
              private reportsService: ReportsService,
              private dateService: DateService) {
    this.form = this.formBuilder.group({
      vehicles: [[], [Validators.required]],
      reportRanges: [[], [Validators.required]],
      reportType: ['XLSX', [Validators.required]],
      dateFrom: [this.calculateDateFrom(), [Validators.required]],
      dateTo: [new Date(), [Validators.required]]
    });
  }

  ngOnInit() {
    this.getMyVehicles();
    this.generatingSubscription = this.reportsService.generatingObserablve.subscribe({
      next: (generating) => this.generating = generating
    });
  }

  ngOnDestroy() {
    this.generatingSubscription.unsubscribe();
  }

  getMyVehicles() {
    this.vehicleService.getMyVehicles().subscribe({
      next: (vehicles) => this.vehicles = vehicles,
      error: () => this.vehicles = []
    });
  }

  generateReport() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.generating = true;
      const reportData = this.prepareReportData();
      const reportType = this.getReportTypeValue();
      this.reportsService.generateReport(reportData, reportType);
    }
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }

  getDateToValue() {
    return this.form.get('dateTo')?.value;
  }

  getDateFromValue() {
    return this.form.get('dateFrom')?.value;
  }

  getReportTypeValue() {
    return this.form.get('reportType')?.value;
  }

  getVehiclesValue() {
    return this.form.get('vehicles')?.value;
  }

  getReportRangesValue() {
    return this.form.get('reportRanges')?.value;
  }

  private prepareReportData(): ReportData {
    return {
      vehicles: this.getVehiclesValue(),
      reportRanges: this.getReportRangesValue(),
      dateFrom: this.dateService.convertDateToJavaLocalDate(this.getDateFromValue())!,
      dateTo: this.dateService.convertDateToJavaLocalDate(this.getDateToValue())!
    } as ReportData
  }

  private calculateDateFrom(): Date {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7);
    return currentDate;
  }
}
