import {Injectable} from '@angular/core';
import {AuthenticationRequest} from '../authentication.service';
import {HttpClient} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {
  AUTH_URL = APP_URL + API_PREFIX + '/auth';

  constructor(private httpClient: HttpClient) {
  }

  signInUser(request: AuthenticationRequest) {
    return this.httpClient.post<JwtTokenResponse>(`${this.AUTH_URL}/authenticate`, request);
  }

  getUserLogged() {
    return this.httpClient.get<UserLoggedResponse>(`${this.AUTH_URL}/user-logged`);
  }

  invalidate() {
    return this.httpClient.post<void>(`${this.AUTH_URL}/invalidate`, {});
  }
}

export interface JwtTokenResponse {
  jwt: string;
  daysSinceLastAuthentication: number;
}

export interface UserLoggedResponse {
  user: User;
  authorities: [];
}
