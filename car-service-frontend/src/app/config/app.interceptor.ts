import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {StorageService} from '../services/storage.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService,
              private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.get('jwt');
    let newRequest;
    if (!!token) {
      newRequest = request.clone({
        withCredentials: true
      });
    } else {
      newRequest = request.clone({
        withCredentials: true
      });
    }
    return next.handle(newRequest).pipe(catchError((err) => {
      if (err.status === 401 || err.status === 403) {
        this.authenticationService.logout();
      }
      throw err;
    }));
  }
}
