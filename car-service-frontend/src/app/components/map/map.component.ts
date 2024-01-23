import {Component, OnDestroy, OnInit} from '@angular/core';
import {VehicleCoordinatesWebSocketService} from "../../services/websocket/vehicle-coordinates-web-socket.service";
import * as L from 'leaflet';
import {latLng, Marker} from 'leaflet';
import {Vehicle} from "../../models/vehicle.model";
import {VehicleService} from "../../services/vehicle.service";
import {VehicleCoordinateWrapper} from "../../models/vehicle-coordinate-wrapper.model";
import {VehicleCoordinate} from "../../models/vehicle-coordinate.model";
import {DateService} from "../../util/services/date.service";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  vehicleCoordinates: VehicleCoordinateWrapper[] = [];
  map: any;
  vehicles: Vehicle[] = [];
  panelExpanded: boolean = false;
  markers: Marker[] = [];
  markerOpened: Marker | null = null;

  constructor(private webSocketService: VehicleCoordinatesWebSocketService,
              private vehicleService: VehicleService,
              private dateService: DateService) {
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
        this.vehicleCoordinates = [];
        Object.keys(vehicleCoordinates).forEach((key) => {
          const vehicleCoordinatesPerVehicle = vehicleCoordinates[key as keyof typeof vehicleCoordinates];
          const vehicleName = this.getVehicleName(key);
          this.vehicleCoordinates.push(new VehicleCoordinateWrapper(vehicleName, vehicleCoordinatesPerVehicle));
          this.addMarkers(vehicleCoordinatesPerVehicle, vehicleName);
        })
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

  private getVehicleName(vehicleId: string) {
    const vehicle = this.vehicles.find((vehicle) => vehicle.id === vehicleId);
    return vehicle?.brand + ' ' + vehicle?.model;
  }

  private addMarkers(vehicleCoordinates: VehicleCoordinate[], vehicleName: string): void {
    this.markers = [];
    vehicleCoordinates.forEach((coordinate) => {
      const time = this.dateService.convertDateToJavaLocalDate(coordinate.time);
      const marker = L.marker(latLng(coordinate.latitude, coordinate.longitude))
        .bindPopup(`<b>Pojazd:</b> ${vehicleName}<br><b>Szerokość:</b> ${coordinate.latitude}°<br><b>Długość:</b> ${coordinate.longitude}°<br><b>Czas:</b> ${time}`)
        .addTo(this.map);
      this.markers.push(marker);
    });
  }

  onCoordinateSelect(vehicleCoordinate: VehicleCoordinate) {
    const markerFound = this.markers.find((marker) => marker.getLatLng().lng === vehicleCoordinate.longitude && marker.getLatLng().lat === vehicleCoordinate.latitude);
    markerFound?.togglePopup();
    this.markerOpened = markerFound!;
  }

  onCoordinateUnSelect() {
    if (this.markerOpened) {
      this.markerOpened?.togglePopup();
      this.markerOpened = null;
    }
  }
}
