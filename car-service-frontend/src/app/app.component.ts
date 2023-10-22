import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from './models/user.model';
import {AuthenticationService} from './services/authentication.service';
import {filter, Subscription} from 'rxjs';
import {SpinnerService} from './services/util/spinner.service';
import {MatDialog} from '@angular/material/dialog';
import {VehicleAddDialogComponent} from './components/vehicles/add-dialog/vehicle-add-dialog.component';
import {VehicleService} from './services/vehicle.service';
import {ThemeService} from './services/util/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userLogged: User | null = null;
  loading = false;
  subscriptions: Subscription = new Subscription();

  constructor(private authenticationService: AuthenticationService,
              private spinnerService: SpinnerService,
              private vehicleService: VehicleService,
              private dialog: MatDialog,
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

  logout() {
    this.authenticationService.logout();
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
        next: (data) => this.vehicleService.saveVehicle(data)
      });
  }

  setTheme() {
    this.themeService.loadTheme();
  }
}
