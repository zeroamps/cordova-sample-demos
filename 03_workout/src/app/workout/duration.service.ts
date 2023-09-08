import { DecimalPipe } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DurationService {
  private _started = moment();
  private _interval: any;
  duration: moment.Duration;

  onChange = new EventEmitter<moment.Duration>();

  constructor(private decimalPipe: DecimalPipe) {
    this.duration = moment.duration(this._started.diff(this._started));
  }

  start() {
    this._started = moment();
    this.duration = moment.duration(0, 'milliseconds');
    this.onChange.emit(this.duration);
    this._interval = setInterval(() => {
      this.duration = moment.duration(moment().diff(this._started));
      this.onChange.emit(this.duration);
    }, 1000);
  }

  stop() {
    clearInterval(this._interval);
  }

  format(duration: moment.Duration) {
    const hours = `${this.decimalPipe.transform(duration.hours(), '2.0')}`;
    const minutes = `${this.decimalPipe.transform(duration.minutes(), '2.0')}`;
    const seconds = `${this.decimalPipe.transform(duration.seconds(), '2.0')}`;
    return `${hours}:${minutes}:${seconds}`;
  }
}
