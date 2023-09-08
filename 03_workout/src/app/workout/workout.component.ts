import { Component } from '@angular/core';
import { WorkoutService } from './workout.service';

@Component({
  templateUrl: './workout.component.html'
})
export class WorkoutComponent {
  duration: string;
  distance: string;
  running: boolean;

  constructor(private workoutService: WorkoutService) {
    this.running = this.workoutService.running;
    this.duration = this.workoutService.duration;
    this.distance = this.workoutService.distance;
    this.workoutService.onChange.subscribe((event) => {
      this.running = event.running;
      this.duration = event.duration;
      this.distance = event.distance;
    });
  }

  start() {
    this.workoutService.start();
  }

  finish() {
    this.workoutService.stop();
  }
}
