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
        this.storageService.save('jwt', token.jwt);
        this.getUserLogged();
      },
      error: () => this.snackBarService.openSnackBar('Autoryzacja nie udana', SnackBarType.ERROR)
    });
  }

  private getUserLogged() {
    this.apiService.getUserLogged().subscribe({
      next: (userLogged) => {
        this.setUserLogged(userLogged.user);
        this.setAuthorities(userLogged.authorities);
        this.router.navigate(['']).then(() => this.snackBarService.openSnackBar('Zalogowano pomyślnie', SnackBarType.SUCCESS));
      },
      error: () => {
        //TODO wylogowanie
      }
    });
  }

  private setAuthorities(authorities: []) {
    this.storageService.save('authorities', authorities);
  }

  public setUserLogged(user: User) {
    this.userLogged.next(user);
  }

  logUserOnInit() {
    const jwt = this.storageService.get('jwt');
    if (jwt) {
      this.getUserLogged();
    }
  }

  logout() {
    //TODO
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
