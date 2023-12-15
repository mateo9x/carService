import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../models/user.model';
import {UserAnnotationWebSocketService} from '../../services/websocket/user-annotation-webSocket.service';
import {Annotation} from '../../models/annotation.model';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input()
  user!: User;
  @Input()
  darkMode!: boolean;
  @Output()
  themeChangeEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  annotations: Annotation[] = [];

  constructor(private authenticationService: AuthenticationService,
              private dialog: MatDialog,
              private webSocketService: UserAnnotationWebSocketService) {
  }

  ngOnInit() {
    this.webSocketService.notifiesObservable.subscribe({
      next: (annotations) => this.annotations = annotations
    })
  }

  logout() {
    this.authenticationService.logout();
    this.dialog.closeAll();
  }

  changeTheme(value: boolean) {
    this.themeChangeEmit.emit(value);
  }
}
