import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {UserApiService} from './api/user-api.service';
import {SnackBarService, SnackBarType} from './common/snack-bar.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: UserApiService,
              private router: Router,
              private snackBarService: SnackBarService) {
  }

  signUp(userRequest: User) {
    this.apiService.signUp(userRequest).subscribe({
      next: () => this.router.navigate(['sign-in']).then(() => this.snackBarService.openSnackBar('Użytkownik został zarejestrowany', SnackBarType.SUCCESS)),
      error: (error) => {
        if (error.error) {
          this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR)
        } else {
          this.snackBarService.openSnackBar('Nie udało się zarejestrować użytkownika', SnackBarType.ERROR)
        }
      }
    });
  }

  updatePassword(password: string) {
    this.apiService.updatePassword(password).subscribe({
      next: () => this.router.navigate(['profile']).then(() => this.snackBarService.openSnackBar('Hasło zostało zaktualizowane', SnackBarType.SUCCESS)),
      error: (error) => {
        if (error.error) {
          this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR)
        } else {
          this.snackBarService.openSnackBar('Nie udało się zaktualizować hasła', SnackBarType.ERROR)
        }
      }
    });
  }
}
