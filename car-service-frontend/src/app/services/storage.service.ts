import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  save(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  get(key: string) {
    const item = localStorage.getItem(key);

    if (item) {
      return item;
    }
    return null;
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }
}
