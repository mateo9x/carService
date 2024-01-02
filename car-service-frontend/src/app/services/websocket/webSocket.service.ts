import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';
import {API_PREFIX} from '../../app.const';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  WS_URL = environment.wsUrl + API_PREFIX;
  socket: WebSocket | undefined;
  data: Subject<any> = new Subject<any>();

  public connect(endpoint: string) {
    this.socket = new WebSocket(`${this.WS_URL}/${endpoint}`);
    this.socket.onmessage = ((event) => this.data.next(JSON.parse(event.data))
    );
  }

  public sendMessage(data: any) {
    this.socket!.send(data);
  }

  public disconnect() {
    this.socket!.close();
  }

}
