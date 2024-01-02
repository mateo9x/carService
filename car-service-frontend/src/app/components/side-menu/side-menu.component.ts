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
  @Input()
  amountOfNotifies!: number;
  @Output()
  themeChangeEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  openNotifyDialogEmit: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  logoutEmit: EventEmitter<void> = new EventEmitter<void>();

  constructor(private authenticationService: AuthenticationService,
              private dialog: MatDialog) {
  }

  logout() {
    this.logoutEmit.emit();
    this.authenticationService.logout();
    this.dialog.closeAll();
  }

  changeTheme(value: boolean) {
    this.themeChangeEmit.emit(value);
  }

  openNotifies() {
    this.openNotifyDialogEmit.emit();
  }
}
