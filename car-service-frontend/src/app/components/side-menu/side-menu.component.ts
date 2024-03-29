import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../models/user.model';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  @Input()
  user!: User;
  @Input()
  darkMode!: boolean;
  @Output()
  themeChangeEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService,
              private dialog: MatDialog) {
  }

  logout() {
    this.authenticationService.logout();
    this.dialog.closeAll();
  }

  changeTheme(value: boolean) {
    this.themeChangeEmit.emit(value);
  }
}
