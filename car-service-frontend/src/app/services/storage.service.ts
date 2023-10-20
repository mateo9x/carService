import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  save(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }
}
