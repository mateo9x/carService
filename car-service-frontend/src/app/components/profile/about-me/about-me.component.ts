import {Component} from '@angular/core';
import {Observable, take} from 'rxjs';
import {User} from '../../../models/user.model';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  userLogged$: Observable<User | null>;

  constructor(private authenticationService: AuthenticationService) {
    this.userLogged$ = this.authenticationService.userObservable.pipe(take(1));
  }

}
