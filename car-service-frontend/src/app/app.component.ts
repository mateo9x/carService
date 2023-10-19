import {Component, OnInit} from '@angular/core';
import {User} from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userLogged: User | null = null;

  ngOnInit() {

  }

  logout() {

  }
}
