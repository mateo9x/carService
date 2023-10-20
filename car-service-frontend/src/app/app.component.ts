import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from './models/user.model';
import {AuthenticationService} from './services/authentication.service';
import {Subscription} from 'rxjs';
import {SpinnerService} from './services/common/spinner.service';

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
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.setUser();
    this.prepareSpinner();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setUser() {
    this.authenticationService.logUserOnInit();
    this.subscriptions.add(this.authenticationService.userObservable.subscribe({
      next: (user) => this.userLogged = user
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
}
