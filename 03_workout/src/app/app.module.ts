import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HistoryModule } from './history/history.module';
import { LoggingModule } from './logging/logging.module';
import { WorkoutModule } from './workout/workout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HistoryModule, LoggingModule, WorkoutModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
