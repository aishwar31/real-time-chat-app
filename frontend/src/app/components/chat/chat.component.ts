import { Component, OnInit } from '@angular/core';

import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: { text: string; timestamp?: string }[] = [];
  newMessage: string = '';

  constructor(private wsService: WebSocketService) { }

  ngOnInit() {
    this.wsService.getMessages().subscribe((message: any) => {
      if (message.type === 'history') {
        this.messages = message.messages; // Load previous messages
      } else if (message.type === 'chat') {
        this.messages.push({ text: message.text });
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.wsService.sendMessage(this.newMessage);
      this.newMessage = ''; // Clear input
    }
  }
}
