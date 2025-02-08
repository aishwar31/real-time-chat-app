import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    // this.socket$ = new WebSocketSubject('ws://localhost:5000'); // Connect to backend
    this.socket$ = new WebSocketSubject('https://real-time-chat-app-scti.onrender.com'); // Connect to Render
  }

  // Send message to WebSocket server
  sendMessage(text: string) {
    this.socket$.next({ type: 'chat', text });
  }

  // Get message stream
  getMessages() {
    return this.socket$;
  }
}