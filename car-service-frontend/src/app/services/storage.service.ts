import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  save(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key) as any);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }
}
