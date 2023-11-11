import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  loading = new BehaviorSubject(false);

  constructor() {
  }

  public setLoading(loading: boolean) {
    this.loading.next(loading);
  }

}
