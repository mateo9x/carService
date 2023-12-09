import {Component} from '@angular/core';
import {isMonday, isSunday, nextSunday, previousMonday} from "date-fns";
import {MatDialog} from '@angular/material/dialog';
import {DateService} from '../../util/services/date.service';
import {SnackBarService, SnackBarType} from '../../util/services/snack-bar.service';
import {User} from '../../models/user.model';
import {SchedulerEventService} from '../../services/scheduler-event.service';
import {SchedulerEvent} from '../../models/scheduler-event.model';
import {SchedulerAddDialogComponent} from './scheduler-add-dialog/scheduler-add-dialog.component';
import {ConfirmDialogComponent} from '../util/confirm-dialog.component';
import {SchedulerEditDialogComponent} from './scheduler-edit-dialog/scheduler-edit-dialog.component';

@Component({
  selector: 'scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {
  tableData: any[] = [];
  user!: User;
  dateFrom!: Date;
  dateTo!: Date;
  schedulerEvents: SchedulerEvent[] = [];
  weekDayNames = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

  constructor(private scheduleService: SchedulerEventService, private snackBarService: SnackBarService,
              private dateService: DateService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.setStartDates();
    this.getSchedulesForSelectedWeek();
  }

  setStartDates() {
    const todayDate = new Date();
    this.dateService.zeroDate(todayDate);
    this.dateFrom = new Date(todayDate);
    this.dateFrom.setDate(1);
    this.dateTo = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0);
  }

  getSchedulesForSelectedWeek() {
    this.scheduleService.getSchedulerEventsByDateBetween(this.dateService.convertDateToJavaLocalDate(this.dateFrom)!, this.dateService.convertDateToJavaLocalDate(this.dateTo)!).subscribe({
      next: (schedulerEvents) => {
        this.schedulerEvents = schedulerEvents;
        this.prepareTable();
      },
      error: () => {
        this.tableData = [];
        this.schedulerEvents = [];
      }
    });
  }

  prepareTable() {
    this.tableData = [];
    let minDate = new Date(this.dateFrom);
    minDate = isMonday(minDate) ? minDate : previousMonday(minDate);
    let maxDate = new Date(this.dateTo);
    maxDate = isSunday(maxDate) ? maxDate : nextSunday(maxDate);
    maxDate.setDate(maxDate.getDate() + 1);
    let row = 0;
    for (let date = minDate; date <= maxDate; date.setDate(date.getDate() + 1)) {
      const dateFormatted = this.dateService.convertDateToJavaLocalDate(date)!;
      const events = this.getEventsForDay(dateFormatted);
      this.dateService.zeroDate(date);
      this.tableData.push({
        day: date.getDate(),
        date: dateFormatted,
        events: events,
        row: row,
        disabled: this.shouldDisableElement(date)
      });
      if (date.getDay() % 7 === 0) {
        row++;
      }
    }
  }

  shouldDisableElement(date: Date): boolean {
    return !((date >= this.dateFrom && date <= this.dateTo) || (date >= this.dateFrom && date.getDate() === this.dateTo.getDate()));
  }

  getEventsForDay(day: string) {
    return this.schedulerEvents.filter((schedulerEvent) => schedulerEvent.day === day);
  }

  openNewEvent(date: string) {
    let dialogRef = this.dialog.open(SchedulerAddDialogComponent, {
      data: date
    });
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response) {
          this.saveSchedulerEvent(date, response);
        }
      }
    });
  }

  saveSchedulerEvent(date: string, schedulerEvent: SchedulerEvent) {
    this.scheduleService.saveSchedulerEvent(schedulerEvent).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Pomyślnie dodano wydarzenie w dniu: ' + date, SnackBarType.SUCCESS);
        this.getSchedulesForSelectedWeek();
      },
      error: () => this.snackBarService.openSnackBar('Nie udało się dodać wydarzenia w dniu: ' + date, SnackBarType.ERROR)
    });
  }

  openEditEvent(schedulerEvent: any, date: string) {
    let dialogRef = this.dialog.open(SchedulerEditDialogComponent, {
      data: schedulerEvent
    });
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response) {
          this.updateSchedulerEvent(date, response);
        }
      }
    });
  }

  updateSchedulerEvent(day: string, schedulerEvent: SchedulerEvent) {
    this.scheduleService.saveSchedulerEvent(schedulerEvent).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Pomyślnie zaktualizowano wydarzenie w dniu: ' + day, SnackBarType.SUCCESS);
        this.getSchedulesForSelectedWeek();
      },
      error: () => this.snackBarService.openSnackBar('Nie udało się zaktualizować wydarzenia w dniu: ' + day, SnackBarType.ERROR)
    });
  }

  deleteConfirmDialog(schedulerEvent: SchedulerEvent, date: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Usuń wydarzenie',
        message: `Czy na pewno chcesz usunąć wybrane wydarzenie w dniu ${date}?`
      }
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.scheduleService.deleteSchedulerEvent(schedulerEvent.id!).subscribe({
            next: () => {
              this.getSchedulesForSelectedWeek();
              this.snackBarService.openSnackBar('Wydarzenie usunięto pomyślnie', SnackBarType.SUCCESS);
            },
            error: () => this.snackBarService.openSnackBar('Wydarzenie nie zostało usunięte', SnackBarType.ERROR)
          });
        }
      }
    });
  }

  getMaxRowNumber() {
    return [...new Set(this.tableData.map(item => item.row))];
  }

  previousMonth() {
    this.dateFrom = new Date(this.dateFrom.setMonth(this.dateFrom.getMonth() - 1));
    this.dateTo = new Date(this.dateFrom.getFullYear(), this.dateFrom.getMonth() + 1, 0);
    this.getSchedulesForSelectedWeek();
  }

  nextMonth() {
    this.dateFrom = new Date(this.dateFrom.setMonth(this.dateFrom.getMonth() + 1));
    this.dateTo = new Date(this.dateFrom.getFullYear(), this.dateFrom.getMonth() + 1, 0);
    this.getSchedulesForSelectedWeek();
  }

  isMobile(): boolean {
    return window.innerWidth < 800;
  }
}
