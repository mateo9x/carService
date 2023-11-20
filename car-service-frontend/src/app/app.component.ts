import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from './models/user.model';
import {AuthenticationService} from './services/authentication.service';
import {filter, Subscription} from 'rxjs';
import {SpinnerService} from './util/services/spinner.service';
import {MatDialog} from '@angular/material/dialog';
import {VehicleAddDialogComponent} from './components/vehicles/add-dialog/vehicle-add-dialog.component';
import {VehicleService} from './services/vehicle.service';
import {ThemeService} from './util/services/theme.service';
import {SnackBarService, SnackBarType} from './util/services/snack-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userLogged: User | null = null;
  loading = false;
  subscriptions: Subscription = new Subscription();
  darkMode = false;

  constructor(private authenticationService: AuthenticationService,
              private spinnerService: SpinnerService,
              private vehicleService: VehicleService,
              private dialog: MatDialog,
              private snackBarService: SnackBarService,
              private themeService: ThemeService) {
  }

  ngOnInit() {
    this.setUser();
    this.prepareSpinner();
    this.setTheme();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setUser() {
    this.authenticationService.logUserOnInit();
    this.subscriptions.add(this.authenticationService.userObservable.subscribe({
      next: (user) => {
        this.userLogged = user;
        if (this.userLogged && this.userLogged.vehicles?.length === 0) {
          this.openAddVehicleDialog();
        }
      }
    }));
  }

  prepareSpinner() {
    this.subscriptions.add(this.spinnerService.loading.subscribe({
      next: (response) => {
        this.loading = response;
      }
    }));
  }

  openAddVehicleDialog() {
    const dialogRef = this.dialog.open(VehicleAddDialogComponent, {
      autoFocus: false,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed()
      .pipe(
        filter((data) => data)
      )
      .subscribe({
        next: (data) => this.vehicleService.saveVehicle(data).subscribe({
          next: () => {
            this.snackBarService.openSnackBar('Pojazd dodany pomyślnie', SnackBarType.SUCCESS);
          },
          error: (error) => {
            if (error.error) {
              this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
            } else {
              this.snackBarService.openSnackBar('Pojazd nie został dodany', SnackBarType.ERROR);
            }
          }
        })
      });
  }

  changeTheme(darkMode: boolean) {
    const value = darkMode ? 'dark' : 'light';
    this.themeService.setTheme(value);
  }

  setTheme() {
    this.darkMode = this.themeService.loadTheme();
  }
}
