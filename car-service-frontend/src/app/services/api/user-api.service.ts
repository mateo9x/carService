import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  AUTH_URL = APP_URL + API_PREFIX + '/users';

  constructor(private httpClient: HttpClient) {
  }

  signUp(user: User) {
    return this.httpClient.post<User>(this.AUTH_URL, user);
  }
}
