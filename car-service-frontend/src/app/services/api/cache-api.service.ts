import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PREFIX, APP_URL} from '../../app.const';
import {Expension} from '../../models/expension.model';

@Injectable({
  providedIn: 'root'
})
export class CacheApiService {
  CACHE_URL = APP_URL + API_PREFIX + '/cache';

  constructor(private httpClient: HttpClient) {
  }

  getCacheDict(cacheKey: string) {
    return this.httpClient.get<any[]>(`${this.CACHE_URL}/${cacheKey}`);
  }
}
