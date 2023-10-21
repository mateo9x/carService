import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  USER_URL = APP_URL + API_PREFIX + '/users';

  constructor(private httpClient: HttpClient) {
  }

  signUp(user: User) {
    return this.httpClient.post<User>(this.USER_URL, user);
  }

  updatePassword(password: string) {
    return this.httpClient.put<void>(`${this.USER_URL}/update-password`, password);
  }

  startResetPasswordProcedure(email: string) {
    return this.httpClient.get<void>(`${this.USER_URL}/reset-password/email/${email}`);
  }

  isResetPasswordTokenValid(token: string) {
    return this.httpClient.get<boolean>(`${this.USER_URL}/reset-password/token/${token}/valid`);
  }

  finishResetPasswordProcedure(token: string, password: string) {
    return this.httpClient.patch<void>(`${this.USER_URL}/reset-password/token/${token}/finish`, password);
  }
}
