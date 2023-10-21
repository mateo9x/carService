import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit, OnDestroy {
  password2Subscription: Subscription = new Subscription();
  form: FormGroup;
  token: string = '';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.form = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      password2: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }

  ngOnInit() {
    this.validateToken();
    this.startPassword2Subscription();
  }

  ngOnDestroy() {
    this.password2Subscription.unsubscribe();
  }

  validateToken() {
    const url = this.router.routerState.snapshot.url;
    this.token = url.substring(url.indexOf('?') + 1, url.length);
    this.userService.isResetPasswordTokenValid(this.token);
  }

  startPassword2Subscription() {
    const password2Control = this.getPassword2Control();
    this.password2Subscription = password2Control.valueChanges.subscribe({
      next: (password2Value) => {
        const passwordValue = this.getPasswordControl().value;
        if ((passwordValue && password2Value) && (passwordValue !== password2Value)) {
          password2Control.setErrors({passwordDoesntMatch: true});
        } else {
          password2Control.setErrors(null);
        }
      }
    });
  }

  changePassword() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.userService.finishResetPasswordProcedure(this.token, this.getPasswordControl().value);
    }
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }

  getPasswordControl() {
    return this.form.get('password') as AbstractControl;
  }

  getPassword2Control() {
    return this.form.get('password2') as AbstractControl;
  }
}
