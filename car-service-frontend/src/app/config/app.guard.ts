import { Injectable } from '@angular/core';
import {StorageService} from '../services/storage.service';

@Injectable()
export class AppGuard {
  constructor(private storageService: StorageService) {
  }

  isAuthenticated() {
    return this.storageService.get('jwt') !== null;
  }
}
