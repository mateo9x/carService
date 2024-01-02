import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'mobile-side-menu',
  templateUrl: './mobile-side-menu.component.html',
  styleUrls: ['./mobile-side-menu.component.scss']
})
export class MobileSideMenuComponent {
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
