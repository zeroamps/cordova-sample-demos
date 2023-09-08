import { Component } from '@angular/core';

import { WorkoutModel } from '../shared/workout.model';
import { WorkoutService } from '../workout/workout.service';

@Component({
  templateUrl: './history.component.html'
})
export class HistoryComponent {
  workouts: WorkoutModel[];
  constructor(private workoutService: WorkoutService) {
    this.workouts = this.workoutService.findAll();
  }
}
