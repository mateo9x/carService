import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';
import {UserPreferences} from '../../models/user-preferences.model';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesApiService {
  USER_PREFERENCES_URL = APP_URL + API_PREFIX + '/user-preferences';

  constructor(private httpClient: HttpClient) {
  }

  savePreferences(userPreferences: UserPreferences) {
    return this.httpClient.post<UserPreferences>(this.USER_PREFERENCES_URL, userPreferences);
  }

  updatePreferences(userPreferences: UserPreferences) {
    return this.httpClient.put<UserPreferences>(this.USER_PREFERENCES_URL, userPreferences);
  }

  getUserPreferencesForUserLogged() {
    return this.httpClient.get<UserPreferences>(`${this.USER_PREFERENCES_URL}/user-logged`);
  }
}
