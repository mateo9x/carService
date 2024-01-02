import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {WebSocketService} from './webSocket.service';

@Injectable({
  providedIn: 'root'
})
export class UserAnnotationWebSocketService {
  notifiesObservable = new BehaviorSubject<any[] | []>([]);

  constructor(private webSocketService: WebSocketService) {
  }

  public connect() {
    this.webSocketService.connect('notifies');
    this.webSocketService.data.subscribe({
      next: (data) => this.notifiesObservable.next(data)
    });
  }

  public sendMessage(data: any) {
    this.webSocketService.sendMessage(data);
  }

  public pushAnnotations(data: any) {
    this.notifiesObservable.next(data);
  }

  public disconnect() {
    this.webSocketService.disconnect();
  }

}
