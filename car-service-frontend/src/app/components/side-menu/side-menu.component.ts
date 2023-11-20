import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  constructor(private authenticationService: AuthenticationService,
              private dialog: MatDialog) {
  }

  logout() {
    this.authenticationService.logout();
    this.dialog.closeAll();
  }
}
