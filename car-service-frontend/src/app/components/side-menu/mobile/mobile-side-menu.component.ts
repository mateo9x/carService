import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthenticationService} from '../../../services/authentication.service';
import {UserAnnotationWebSocketService} from '../../../services/websocket/user-annotation-webSocket.service';
import {Annotation} from '../../../models/annotation.model';

@Component({
  selector: 'mobile-side-menu',
  templateUrl: './mobile-side-menu.component.html',
  styleUrls: ['./mobile-side-menu.component.scss']
})
export class MobileSideMenuComponent implements OnInit {
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
