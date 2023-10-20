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

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwt = this.storageService.get('jwt');

    if (jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwt
        }
      });
    }
    return next.handle(request).pipe(catchError((err) => {
      if (err.status === 401 || err.status === 403) {
        this.authenticationService.logoutOnError();
      }
      throw err;
    }));
  }
}
