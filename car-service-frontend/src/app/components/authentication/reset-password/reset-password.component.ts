import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]]
    });
  }

  resetPassword() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.userService.startResetPasswordProcedure(this.getEmailControl().value);
    }
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }

  getEmailControl() {
    return this.form.get('email') as AbstractControl;
  }
}
