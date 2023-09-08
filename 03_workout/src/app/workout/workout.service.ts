import { EventEmitter, Injectable } from '@angular/core';
import * as moment from 'moment';

import { Workout } from '../shared/workout.domain';
import { WorkoutModel } from '../shared/workout.model';
import { DistanceService } from './distance.service';
import { DurationService } from './duration.service';
import { WorkoutChangeEvent } from './workout-change-event';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  running: boolean;
  duration: string;
  distance: string;
  private _started: number;
  private _workouts: Workout[] = [];
  onChange = new EventEmitter<WorkoutChangeEvent>();

  constructor(private durationService: DurationService, private distanceService: DistanceService) {
    const workouts = localStorage.getItem('workouts');
    if (!workouts) return;
    this._workouts = JSON.parse(workouts);

    this.durationService.onChange.subscribe((duration) => {
      this.duration = this.durationService.format(duration);
      this.onChange.emit({ running: this.running, duration: this.duration, distance: this.distance });
    });
    this.duration = this.durationService.format(this.durationService.duration);
    this.distanceService.onChange.subscribe((distance) => {
      this.distance = this.distanceService.format(distance);
      this.onChange.emit({ running: this.running, duration: this.duration, distance: this.distance });
    });
    this.distance = this.distanceService.format(this.distanceService.distance);
  }

  start() {
    this._started = Date.now();
    this.durationService.start();
    this.distanceService.start();
    this.running = true;
    this.onChange.emit({ running: this.running, duration: this.duration, distance: this.distance });
  }

  stop() {
    this.durationService.stop();
    this.distanceService.stop();
    this.insert(this._started, this.durationService.duration.asMilliseconds(), this.distanceService.distance);
    this.running = false;
    this.onChange.emit({ running: this.running, duration: this.duration, distance: this.distance });
  }

  findAll() {
    return this._workouts
      .sort((a, b) => b.started - a.started)
      .map(
        (workout) =>
          ({
            started: new Date(workout.started).toLocaleString(),
            duration: this.durationService.format(moment.duration(workout.duration, 'milliseconds')),
            distance: this.distanceService.format(workout.distance)
          } as WorkoutModel)
      );
  }

  insert(started: number, duration: number, distance: number) {
    this._workouts.push({ started, duration, distance });
    localStorage.setItem('workouts', JSON.stringify(this._workouts));
  }
}
