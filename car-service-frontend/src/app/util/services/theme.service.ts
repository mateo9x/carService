import {Injectable} from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private storageService: StorageService) {
  }

  loadTheme() {
    let darkMode = false;
    const theme = JSON.parse(this.storageService.get('theme')!) ?? 'light';
    this.overrideColors(theme);
    if (theme === 'dark') {
      darkMode = true;
    }
    return darkMode;
  }

  setTheme(themeMode: string) {
    this.storageService.save('theme', themeMode);
    this.overrideColors(themeMode);
  }

  private overrideColors(themeMode: string) {
    switch (themeMode) {
      case 'light': {
        document.documentElement.style.setProperty('--nav-bg-color', '#373b41');
        document.documentElement.style.setProperty('--nav-bg-color-hover', '#373a41');
        document.documentElement.style.setProperty('--nav-text-color', 'white');
        document.documentElement.style.setProperty('--nav-hover-color', '#eae5e5');
        document.documentElement.style.setProperty('--main-bg-color', '#104a6e');
        document.documentElement.style.setProperty('--main-bg-color-hover', '#0d3f5e');
        document.documentElement.style.setProperty('--router-bg-color', 'white');
        document.documentElement.style.setProperty('--router-text-color', 'black');
        document.documentElement.style.setProperty('--mat-icon-color', '#104a6e');
        document.documentElement.style.setProperty('--checkbox-border-color', '#104a6e');
      }
        break;
      case 'dark': {
        document.documentElement.style.setProperty('--nav-bg-color', 'rgba(17,17,17,0.98)');
        document.documentElement.style.setProperty('--nav-bg-color-hover', 'rgba(17,17,17,0.78)');
        document.documentElement.style.setProperty('--nav-text-color', 'white');
        document.documentElement.style.setProperty('--nav-hover-color', '#eae5e5');
        document.documentElement.style.setProperty('--main-bg-color', '#111111');
        document.documentElement.style.setProperty('--main-bg-color-hover', '#111111');
        document.documentElement.style.setProperty('--router-bg-color', 'rgba(17,17,17,0.98)');
        document.documentElement.style.setProperty('--router-text-color', 'white');
        document.documentElement.style.setProperty('--mat-icon-color', 'white');
        document.documentElement.style.setProperty('--checkbox-border-color', 'white');
      }
        break;
    }

  }

}
