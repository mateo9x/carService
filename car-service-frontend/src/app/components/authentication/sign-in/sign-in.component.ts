import {Component} from '@angular/core';
import {AuthenticationRequest, AuthenticationService} from '../../../services/authentication.service';
import {SignInFormService} from './sign-in-form.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  form: FormGroup;

  constructor(private formService: SignInFormService,
              private authenticationService: AuthenticationService) {
    this.form = this.formService.getFormGroup();
  }

  signIn() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.authenticationService.signinUser(this.formService.convertFormToAuthenticationRequest(this.form));
    }
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName)?.hasError(errorName);
  }
}
