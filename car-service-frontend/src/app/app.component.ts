import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {User} from './models/user.model';
import {AuthenticationService} from './services/authentication.service';
import {filter, Subscription} from 'rxjs';
import {SpinnerService} from './util/services/spinner.service';
import {MatDialog} from '@angular/material/dialog';
import {VehicleAddDialogComponent} from './components/vehicles/add-dialog/vehicle-add-dialog.component';
import {VehicleService} from './services/vehicle.service';
import {ThemeService} from './util/services/theme.service';
import {SnackBarService, SnackBarType} from './util/services/snack-bar.service';
import {UserAnnotationWebSocketService} from './services/websocket/user-annotation-webSocket.service';
import {Annotation} from './models/annotation.model';

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
  isMobile = false;
  notifyMenuOpened = false;
  notifies: Annotation[] = [];

  constructor(private authenticationService: AuthenticationService,
              private spinnerService: SpinnerService,
              private vehicleService: VehicleService,
              private dialog: MatDialog,
              private snackBarService: SnackBarService,
              private themeService: ThemeService,
              private webSocketService: UserAnnotationWebSocketService) {
  }

  ngOnInit() {
    this.setUser();
    this.prepareSpinner();
    this.setTheme();
    this.isMobileView();
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.closeUserAnnotationWebSocket();
  }

  setUser() {
    this.authenticationService.logUserOnInit();
    this.subscriptions.add(this.authenticationService.userObservable.subscribe({
      next: (user) => {
        this.userLogged = user;
        if (this.userLogged) {
          this.starUserAnnotationWebSocket();
          this.getNotifies();
        }
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

  starUserAnnotationWebSocket() {
    this.webSocketService.connect();
  }

  closeUserAnnotationWebSocket() {
    this.webSocketService.disconnect();
  }

  getNotifies() {
    this.webSocketService.notifiesObservable.subscribe({
      next: (annotations) => this.notifies = annotations
    });
  }

  openNotifyMenu() {
    this.notifyMenuOpened = true;
  }

  closeNotifyDialog() {
    this.notifyMenuOpened = false;
  }

  @HostListener('window:resize', ['$event'])
  isMobileView() {
    this.isMobile = window.innerWidth < 800;
  }
}
