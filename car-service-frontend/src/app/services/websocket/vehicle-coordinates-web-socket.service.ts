import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {WebSocketService} from './webSocket.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleCoordinatesWebSocketService {
  private vehicleCoordinatesObservable = new BehaviorSubject<any[] | []>([]);
  vehicleCoordinates$ = this.vehicleCoordinatesObservable.asObservable();

  constructor(private webSocketService: WebSocketService) {
  }

  public connect() {
    this.webSocketService.connect('notifies');
    this.webSocketService.data.subscribe({
      next: (data) => this.vehicleCoordinatesObservable.next(data)
    });
  }

  public sendMessage(data: any) {
    this.webSocketService.sendMessage(data);
  }

  public pushAnnotations(data: any) {
    this.vehicleCoordinatesObservable.next(data);
  }

  public disconnect() {
    this.webSocketService.disconnect();
  }

}
