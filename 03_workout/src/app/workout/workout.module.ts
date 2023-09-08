import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { WorkoutComponent } from './workout.component';
import { WorkoutRoutingModule } from './workout-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WorkoutComponent],
  providers: [DecimalPipe],
  imports: [CommonModule, WorkoutRoutingModule, SharedModule]
})
export class WorkoutModule {}
