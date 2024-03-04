import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {filter} from "rxjs";

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  form: FormGroup;
  mailSent = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]]
    });
  }

  resetPassword() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const result = this.userService.startResetPasswordProcedure(this.getEmailControl().value);
      result
        .pipe(
          filter((result) => result)
        )
        .subscribe({
          next: () => this.mailSent = true
        });
    }
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }

  getEmailControl() {
    return this.form.get('email') as AbstractControl;
  }
}
