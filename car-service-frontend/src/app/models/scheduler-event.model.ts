export class SchedulerEvent {
  id?: string;
  vehicleId: string;
  day: string;
  time: string;
  info: string;
  notify: boolean;
  notifyTimeBefore: number;

  constructor(vehicleId: string, day: string, time: string, info: string, notify: boolean, notifyTimeBefore: number, id?: string) {
    this.id = id;
    this.vehicleId = vehicleId;
    this.day = day;
    this.time = time;
    this.info = info;
    this.notify = notify;
    this.notifyTimeBefore = notifyTimeBefore;
  }
}
