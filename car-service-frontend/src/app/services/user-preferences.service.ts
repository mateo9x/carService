import {Injectable} from '@angular/core';
import {UserPreferencesApiService} from './api/user-preferences-api.service';
import {UserPreferences} from '../models/user-preferences.model';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  constructor(private apiService: UserPreferencesApiService) {
  }

  saveUserPreferences(userPreferences: UserPreferences) {
    return this.apiService.savePreferences(userPreferences);
  }

  updateUserPreferences(userPreferences: UserPreferences) {
    return this.apiService.updatePreferences(userPreferences);
  }

  getUserPreferencesForUserLogged() {
    return this.apiService.getUserPreferencesForUserLogged();
  }
}
