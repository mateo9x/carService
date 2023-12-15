import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Annotation} from '../../models/annotation.model';
import {Stomp} from "@stomp/stompjs";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAnnotationWebSocketService {
  notifiesObservable = new BehaviorSubject<Annotation[] | []>([]);
  stompClient: any;

  public connect(userId: string) {

    const socket = new WebSocket(environment.webSocketUrl + '/stocks');
    socket.onerror = (event) => console.log(event);
    socket.onopen = (event) => console.log(event);
    socket.onclose = (event) => console.log(event);
    socket.onmessage = (event) => console.log(event);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.debug = () => {
    };
    this.stompClient.connect({}, function () {
      _this.sendMessage(userId);
      _this.stompClient.subscribe('/ws/annotations', function (data: any) {
        if (JSON.parse(data.body)) {
          _this.pushAnnotations(JSON.parse(data.body));
        }
      });
    });
  }

  public sendMessage(userId: string) {
    this.stompClient.send(
      '/current/annotations',
      {},
      userId
    );
  }

  public pushAnnotations(data: any) {
    this.notifiesObservable.next(data);
  }

  public disconnect() {
    this.stompClient.disconnect();
  }

}
