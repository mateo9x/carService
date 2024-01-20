import {Component, OnDestroy, OnInit} from '@angular/core';
import {VehicleCoordinatesWebSocketService} from "../../services/websocket/vehicle-coordinates-web-socket.service";
import {VehicleCoordinate} from "../../models/vehicle-coordinate.model";
import * as L from 'leaflet';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  vehicleCoordinates: VehicleCoordinate[] = [];
  map: any;

  constructor(private webSocketService: VehicleCoordinatesWebSocketService) {
  }

  ngOnInit() {
    this.initMap();
    this.starUserAnnotationWebSocket();
  }

  ngOnDestroy() {
    this.closeUserAnnotationWebSocket();
  }

  initMap() {
    this.map = L.map('map', {
      center: [52.1, 19.1451],
      zoom: 7
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  starUserAnnotationWebSocket() {
    this.webSocketService.connect();
  }

  closeUserAnnotationWebSocket() {
    this.webSocketService.disconnect();
  }

  getNotifies() {
    this.webSocketService.vehicleCoordinates$.subscribe({
      next: (vehicleCoordinates) => this.vehicleCoordinates = vehicleCoordinates
    });
  }
}
