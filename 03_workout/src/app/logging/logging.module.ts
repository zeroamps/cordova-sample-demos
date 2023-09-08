import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggingComponent } from './logging.component';
import { LoggingRoutingModule } from './logging-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoggingComponent],
  imports: [CommonModule, SharedModule, LoggingRoutingModule]
})
export class LoggingModule {}
