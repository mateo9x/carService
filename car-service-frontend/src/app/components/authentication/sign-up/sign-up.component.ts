import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SignUpFormService} from './sign-up-form.service';
import {UserApiService} from '../../../services/api/user-api.service';
import {SnackBarService, SnackBarType} from '../../../services/common/snack-bar.service';
import {Router} from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  form: FormGroup;

  constructor(private formService: SignUpFormService,
              private apiService: UserApiService,
              private snackBarService: SnackBarService,
              private router: Router) {
    this.form = this.formService.getFormGroup();
  }

  signUp() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.apiService.signUp(this.formService.convertFormToUserRequest(this.form)).subscribe({
        next: () => this.router.navigate(['sign-in']).then(() => this.snackBarService.openSnackBar('Użytkownik został zarejestrowany', SnackBarType.SUCCESS)),
        error: () => this.snackBarService.openSnackBar('Nie udało zarejestrować się użytkownika', SnackBarType.ERROR)
      });
    }
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }

}
