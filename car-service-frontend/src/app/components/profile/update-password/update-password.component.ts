import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
  password2Subscription: Subscription = new Subscription();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.form = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      password2: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }

  ngOnInit() {
    this.startPassword2Subscription();
  }

  ngOnDestroy() {
    this.password2Subscription.unsubscribe();
  }

  startPassword2Subscription() {
    const password2Control = this.getPassword2();
    this.password2Subscription = password2Control.valueChanges.subscribe({
      next: (password2Value) => {
        const passwordValue = this.getPassword().value;
        if ((passwordValue && password2Value) && (passwordValue !== password2Value)) {
          password2Control.setErrors({doesntMatch: true});
        } else {
          password2Control.setErrors(null);
        }
      }
    });
  }

  updatePassword() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.userService.updatePassword(this.getPassword().value);
    }
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }

  getPassword() {
    return this.form.get('password') as AbstractControl;
  }

  getPassword2() {
    return this.form.get('password2') as AbstractControl;
  }
}
