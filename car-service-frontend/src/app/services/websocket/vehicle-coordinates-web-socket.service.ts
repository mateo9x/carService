import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {WebSocketService} from './webSocket.service';
import {StorageService} from "../storage.service";

@Injectable({
  providedIn: 'root'
})
export class VehicleCoordinatesWebSocketService {
  private vehicleCoordinatesObservable = new BehaviorSubject<any[] | []>([]);
  vehicleCoordinates$ = this.vehicleCoordinatesObservable.asObservable();

  constructor(private webSocketService: WebSocketService,
              private storageService: StorageService) {
  }

  public connect() {
    const jwt = this.storageService.get('jwt')!;
    this.webSocketService.connect(`notifies?token=${JSON.parse(jwt)}`);
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
