import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private _messages: string[] = [];

  findAll() {
    return this._messages;
  }

  insert(message: string) {
    this._messages.push(`${new Date().toISOString()}: ${message}`);
  }
}
