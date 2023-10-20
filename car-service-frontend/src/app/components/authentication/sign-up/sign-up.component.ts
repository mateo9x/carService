import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SignUpFormService} from './sign-up-form.service';
import {UserApiService} from '../../../services/api/user-api.service';
import {SnackBarService, SnackBarType} from '../../../services/common/snack-bar.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  form: FormGroup;
  password2Subscription: Subscription = new Subscription();

  constructor(private formService: SignUpFormService,
              private apiService: UserApiService,
              private snackBarService: SnackBarService,
              private router: Router) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit() {
    const password2Control = this.formService.getPassword2Control(this.form);
    this.password2Subscription = password2Control.valueChanges.subscribe({
      next: (password2Value) => {
        const passwordValue = this.formService.getPasswordControl(this.form).value;
        if ((passwordValue && password2Value) && (passwordValue !== password2Value)) {
          password2Control.setErrors({passwordDoesntMatch: true});
        } else {
          password2Control.setErrors(null);
        }
      }
    });
  }

  ngOnDestroy() {
    this.password2Subscription.unsubscribe();
  }


  signUp() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.apiService.signUp(this.formService.convertFormToUserRequest(this.form)).subscribe({
        next: () => this.router.navigate(['sign-in']).then(() => this.snackBarService.openSnackBar('Użytkownik został zarejestrowany', SnackBarType.SUCCESS)),
        error: (error) => {
          console.log(error);
          this.snackBarService.openSnackBar('Nie udało zarejestrować się użytkownika', SnackBarType.ERROR)
        }
      });
    }
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }

}
