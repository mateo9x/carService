import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationRequest} from "../../../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class SignInFormService {

  constructor(private fb: FormBuilder) {
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }

  convertFormToAuthenticationRequest(form: FormGroup): AuthenticationRequest {
    const email = this.getEmailControl(form).value;
    const password = this.getPasswordControl(form).value;
    return new AuthenticationRequest(email, password);
  }

  getEmailControl(form: FormGroup): AbstractControl {
    return form.get('email') as AbstractControl;
  }

  getPasswordControl(form: FormGroup): AbstractControl {
    return form.get('password') as AbstractControl;
  }

}
