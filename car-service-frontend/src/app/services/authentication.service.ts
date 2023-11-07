import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {StorageService} from './storage.service';
import {AuthenticationApiService} from './api/authentication-api.service';
import {SnackBarService, SnackBarType} from './util/snack-bar.service';
import {InspectionService} from './inspection.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userLogged: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  userObservable = this.userLogged.asObservable();


  constructor(private apiService: AuthenticationApiService,
              private snackBarService: SnackBarService,
              private storageService: StorageService,
              private router: Router,
              private inspectionService: InspectionService) {
  }

  public signinUser(request: AuthenticationRequest) {
    this.apiService.signInUser(request).subscribe({
      next: (response) => {
        this.setToken(response.jwt);
        this.getUserLogged(true);
        if (response.daysSinceLastAuthentication >= 7) {
          this.inspectionService.updateMileageForVehicles();
        }
      },
      error: (error) => {
        if (error.error) {
          this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
        } else {
          this.snackBarService.openSnackBar('Nie udało zalogować się', SnackBarType.ERROR);
        }
      }
    });
  }

  public getUserLogged(signInAttempt: boolean) {
    this.apiService.getUserLogged().subscribe({
      next: (userLogged) => {
        this.setUserLogged(userLogged.user);
        this.setAuthorities(userLogged.authorities);
        if (signInAttempt) {
          this.router.navigate(['']).then(() => this.snackBarService.openSnackBar('Zalogowano pomyślnie', SnackBarType.SUCCESS));
        }
      },
      error: () => this.logout()
    });
  }

  private setAuthorities(authorities: []) {
    this.storageService.save('authorities', authorities);
  }

  private removeAuthorities() {
    this.storageService.delete('authorities');
  }

  private setToken(token: string) {
    this.storageService.save('jwt', token);
  }

  private removeToken() {
    this.storageService.delete('jwt');
  }

  public setUserLogged(user: User | null) {
    this.userLogged.next(user);
  }

  logUserOnInit() {
    const jwt = this.storageService.get('jwt');
    if (jwt) {
      this.getUserLogged(false);
    }
  }

  logout() {
    this.apiService.invalidate().subscribe({
      next: () => {
        this.removeAuthorities();
        this.removeToken();
        this.setUserLogged(null);
        this.router.navigate(['']).then(() => this.snackBarService.openSnackBar('Wylogowano pomyślnie', SnackBarType.SUCCESS))
      }
    });
  }

  logoutOnError() {
    this.removeAuthorities();
    this.removeToken();
    this.setUserLogged(null);
  }

}

export class AuthenticationRequest {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
