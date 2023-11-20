import {Injectable} from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private storageService: StorageService) {
  }

  loadTheme() {
    const theme = this.storageService.get('theme');
    if (theme) {
      this.overrideColors(theme);
    }
  }

  setTheme(colorValue: string, save: boolean) {
    if (save) {
      this.storageService.save('theme', colorValue);
    }
    this.overrideColors(colorValue);
  }

  private overrideColors(colorValue: string) {
    switch (colorValue) {
      case 'default': {
        document.documentElement.style.setProperty('--nav-bg-color', '#3a3b3d');
        document.documentElement.style.setProperty('--nav-bg-color-hover', '#353738');
        document.documentElement.style.setProperty('--nav-text-color', 'white');
        document.documentElement.style.setProperty('--nav-hover-color', '#eae5e5');
        document.documentElement.style.setProperty('--main-bg-color', '#27919a');
        document.documentElement.style.setProperty('--main-bg-color-hover', '#1f646b');
      }
        break;
      case 'green': {
        document.documentElement.style.setProperty('--nav-bg-color', '#3a3b3d');
        document.documentElement.style.setProperty('--nav-bg-color-hover', '#353738');
        document.documentElement.style.setProperty('--nav-text-color', 'white');
        document.documentElement.style.setProperty('--nav-hover-color', '#eae5e5');
        document.documentElement.style.setProperty('--main-bg-color', '#1d7e2d');
        document.documentElement.style.setProperty('--main-bg-color-hover', '#166724');
      }
        break;
      case 'black': {
        document.documentElement.style.setProperty('--nav-bg-color', '#111111');
        document.documentElement.style.setProperty('--nav-bg-color', '#000000');
        document.documentElement.style.setProperty('--nav-text-color', 'white');
        document.documentElement.style.setProperty('--nav-hover-color', '#eae5e5');
        document.documentElement.style.setProperty('--main-bg-color', '#111111');
        document.documentElement.style.setProperty('--main-bg-color-hover', '#111111');
      }
        break;
      case 'yellow': {
        document.documentElement.style.setProperty('--nav-bg-color', '#3a3b3d');
        document.documentElement.style.setProperty('--nav-bg-color-hover', '#353738');
        document.documentElement.style.setProperty('--nav-text-color', 'white');
        document.documentElement.style.setProperty('--nav-hover-color', '#eae5e5');
        document.documentElement.style.setProperty('--main-bg-color', '#b6c031');
        document.documentElement.style.setProperty('--main-bg-color-hover', '#a4ad2c');
      }
        break;
    }

  }

}
