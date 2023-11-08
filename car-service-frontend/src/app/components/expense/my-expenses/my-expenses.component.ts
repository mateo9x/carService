import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../../../services/vehicle.service';
import {Vehicle} from '../../../models/vehicle.model';
import {MatDialog} from '@angular/material/dialog';
import {filter} from 'rxjs';
import {SnackBarService, SnackBarType} from '../../../services/util/snack-bar.service';
import {ExpensionService} from '../../../services/expension.service';
import {Expension} from '../../../models/expension.model';
import {ExpensionAddDialogComponent} from '../add-dialog/expension-add-dialog.component';

@Component({
  selector: 'my-expenses',
  templateUrl: './my-expenses.component.html',
  styleUrls: ['./my-expenses.component.scss']
})
export class MyExpensesComponent implements OnInit {
  expenses: Expension[] = [];
  vehicles: Vehicle[] = [];
  vehicleIdSelected: string | null = null;

  constructor(private vehicleService: VehicleService,
              private expensionService: ExpensionService,
              private dialog: MatDialog,
              private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.getMyVehicles();
  }

  getMyVehicles() {
    this.vehicleService.getMyVehicles().subscribe({
      next: (vehicles) => this.vehicles = vehicles,
      error: () => this.vehicles = []
    });
  }

  getExpensesForVehicle(vehicleId: string) {
    this.vehicleIdSelected = vehicleId;
    this.expensionService.getExpensesByVehicleId(vehicleId).subscribe({
      next: (expenses) => this.expenses = expenses
    });
  }

  addExpension(vehicleId: string | null) {
    if (vehicleId) {
      const dialogRef = this.dialog.open(ExpensionAddDialogComponent, {
        autoFocus: false,
        maxHeight: '90vh',
        data: vehicleId
      });
      dialogRef.afterClosed()
        .pipe(
          filter((data) => data)
        )
        .subscribe({
          next: (data) => this.expensionService.saveExpension(data.expension, data.attachments).subscribe({
            next: () => {
              this.snackBarService.openSnackBar('Wydatek dodany pomyślnie', SnackBarType.SUCCESS);
              this.getExpensesForVehicle(vehicleId);
            },
            error: (error) => {
              if (error.error) {
                this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
              } else {
                this.snackBarService.openSnackBar('Wydatek nie został dodany', SnackBarType.ERROR);
              }
            }
          })
        });
    }
  }

  deleteExpension(id: string) {
    this.expensionService.deleteExpension(id).subscribe({
      next: () => {
        this.getExpensesForVehicle(this.vehicleIdSelected as string);
        this.snackBarService.openSnackBar('Wydatek usunięty pomyślnie', SnackBarType.SUCCESS);
      },
      error: () => this.snackBarService.openSnackBar('Wydatek nie został usunięty', SnackBarType.ERROR)
    });
  }

}
