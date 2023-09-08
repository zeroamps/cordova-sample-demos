import { Component } from '@angular/core';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html'
})
export class LoggingComponent {
  messages: string[];
  constructor(private loggingService: LoggingService) {
    this.messages = this.loggingService.findAll();
  }
}
