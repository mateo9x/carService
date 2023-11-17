import {Component, OnInit} from '@angular/core';
import {Vehicle} from '../../models/vehicle.model';
import {VehicleService} from '../../services/vehicle.service';
import {NgxTimelineEvent} from '@frxjs/ngx-timeline/lib/models';
import {TimelineService} from '../../services/timeline.service';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  vehicles: Vehicle[] = [];
  vehicleIdSelected: string | null = null;
  timelineHistory: NgxTimelineEvent[] = [];

  constructor(private vehicleService: VehicleService,
              private timelineService: TimelineService) {
  }

  ngOnInit() {
    this.getMyVehicles();
  }

  getMyVehicles() {
    this.vehicleService.getMyVehicles().subscribe({
      next: (vehicles) => this.vehicles = vehicles,
      error: () => this.vehicles = []
    });
  }

  getTimelineForVehicle(vehicleId: string) {
    this.timelineService.getTimelineHistoryForVehicle(vehicleId).subscribe({
      next: (timelineHistory) => {
        this.timelineHistory = timelineHistory
      },
      error: () => this.timelineHistory = []
    });
  }

  getLabelDate(date: Date) {
    let dateFormatted= date.toLocaleString('default', {month: 'long', year: 'numeric'});
    return dateFormatted.replace(dateFormatted.charAt(0), dateFormatted.charAt(0).toUpperCase());
  }
}
