import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {StorageService} from './storage.service';
import {AuthenticationApiService} from './api/authentication-api.service';
import {SnackBarService, SnackBarType} from './common/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userLogged: Subject<User | null> = new Subject<User | null>();
  userObservable = this.userLogged.asObservable();


  constructor(private apiService: AuthenticationApiService,
              private snackBarService: SnackBarService,
              private storageService: StorageService,
              private router: Router) {
  }

  public signinUser(request: AuthenticationRequest) {
    this.apiService.signInUser(request).subscribe({
      next: (token) => {
        this.setToken(token.jwt);
        this.getUserLogged(false);
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

  private getUserLogged(tokenStored: boolean) {
    this.apiService.getUserLogged().subscribe({
      next: (userLogged) => {
        this.setUserLogged(userLogged.user);
        this.setAuthorities(userLogged.authorities);
        if (!tokenStored) {
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
      this.getUserLogged(true);
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
