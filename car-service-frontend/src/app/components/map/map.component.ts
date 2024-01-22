import {Component, OnDestroy, OnInit} from '@angular/core';
import {VehicleCoordinatesWebSocketService} from "../../services/websocket/vehicle-coordinates-web-socket.service";
import * as L from 'leaflet';
import {Vehicle} from "../../models/vehicle.model";
import {VehicleService} from "../../services/vehicle.service";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  vehicleCoordinates: any[] = [];
  map: any;
  vehicles: Vehicle[] = [];
  panelExpanded: boolean = false;

  constructor(private webSocketService: VehicleCoordinatesWebSocketService,
              private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.initMap();
    this.getMyVehicles();
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
    this.getNotifies();
  }

  closeUserAnnotationWebSocket() {
    this.webSocketService.disconnect();
  }

  getNotifies() {
    this.webSocketService.vehicleCoordinates$.subscribe({
      next: (vehicleCoordinates) => {
        this.vehicleCoordinates = vehicleCoordinates;
        console.log(vehicleCoordinates)
        // L.marker()
      }
    });
  }

  togglePanel() {
    this.panelExpanded = !this.panelExpanded;
  }

  getMyVehicles() {
    this.vehicleService.getMyVehicles().subscribe({
      next: (vehicles) => this.vehicles = vehicles
    });
  }

  getVehicleName(vehicleId: string) {
    const vehicle = this.vehicles.find((vehicle) => vehicle.id === vehicleId);
    return vehicle?.brand + ' ' + vehicle?.model;
  }
}
