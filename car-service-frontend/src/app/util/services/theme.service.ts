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
        document.documentElement.style.setProperty('--nav-bg-color', '#3a3b3d');
        document.documentElement.style.setProperty('--nav-bg-color-hover', '#353738');
        document.documentElement.style.setProperty('--nav-text-color', 'white');
        document.documentElement.style.setProperty('--nav-hover-color', '#eae5e5');
        document.documentElement.style.setProperty('--main-bg-color', '#27919a');
        document.documentElement.style.setProperty('--main-bg-color-hover', '#1f646b');
      }
        break;
      case 'dark': {
        document.documentElement.style.setProperty('--nav-bg-color', 'rgba(17,17,17,0.98)');
        document.documentElement.style.setProperty('--nav-bg-color-hover', 'rgba(17,17,17,0.78)');
        document.documentElement.style.setProperty('--nav-text-color', 'white');
        document.documentElement.style.setProperty('--nav-hover-color', '#eae5e5');
        document.documentElement.style.setProperty('--main-bg-color', '#111111');
        document.documentElement.style.setProperty('--main-bg-color-hover', '#111111');
      }
        break;
    }

  }

}
