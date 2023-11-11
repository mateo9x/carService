import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {UserApiService} from './api/user-api.service';
import {SnackBarService, SnackBarType} from '../util/services/snack-bar.service';
import {Router} from '@angular/router';
import {SpinnerService} from '../util/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: UserApiService,
              private router: Router,
              private snackBarService: SnackBarService,
              private spinnerService: SpinnerService) {
  }

  signUp(userRequest: User) {
    this.setSpinner(true);
    this.apiService.signUp(userRequest).subscribe({
      next: () => {
        this.setSpinner(false);
        this.router.navigate(['']).then(() => this.snackBarService.openSnackBar('Użytkownik został zarejestrowany', SnackBarType.SUCCESS));
      },
      error: (error) => {
        this.setSpinner(false);
        if (error.error) {
          this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
        } else {
          this.snackBarService.openSnackBar('Nie udało się zarejestrować użytkownika', SnackBarType.ERROR);
        }
      }
    });
  }

  updatePassword(password: string) {
    this.apiService.updatePassword(password).subscribe({
      next: () => this.router.navigate(['profile']).then(() => this.snackBarService.openSnackBar('Hasło zostało zaktualizowane', SnackBarType.SUCCESS)),
      error: (error) => {
        if (error.error) {
          this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
        } else {
          this.snackBarService.openSnackBar('Nie udało się zaktualizować hasła', SnackBarType.ERROR);
        }
      }
    });
  }

  startResetPasswordProcedure(email: string) {
    this.setSpinner(true);
    this.apiService.startResetPasswordProcedure(email).subscribe({
      next: () => {
        this.setSpinner(false);
        this.router.navigate(['']).then(() => this.snackBarService.openSnackBar('Link do odzyskania konta został wysłany na wskazany email', SnackBarType.SUCCESS));
      },
      error: (error) => {
        this.setSpinner(false);
        if (error.error) {
          this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
        } else {
          this.snackBarService.openSnackBar('Nie udało się wygenerować próby resetu hasła', SnackBarType.ERROR);
        }
      }
    });
  }

  isResetPasswordTokenValid(token: string) {
    this.apiService.isResetPasswordTokenValid(token).subscribe({
      next: (valid) => {
        if (!valid) {
          this.router.navigate(['']).then(() => this.snackBarService.openSnackBar('Token stracił swoją ważność', SnackBarType.WARN));
        }
      },
      error: (error) => {
        if (error.error) {
          this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
        } else {
          this.snackBarService.openSnackBar('Wygeneruj prośbę o reset hasła ponownie', SnackBarType.ERROR);
        }
      }
    })
  }

  finishResetPasswordProcedure(token: string, password: string) {
    this.apiService.finishResetPasswordProcedure(token, password).subscribe({
      next: () => this.router.navigate(['sign-in']).then(() => this.snackBarService.openSnackBar('Hasło zostało zmienione', SnackBarType.SUCCESS)),
      error: () => this.snackBarService.openSnackBar('Nie udało się zmienić hasła', SnackBarType.ERROR)
    });
  }

  private setSpinner(loading: boolean) {
    this.spinnerService.setLoading(loading);
  }
}
