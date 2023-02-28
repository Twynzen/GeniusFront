import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent {
  message = '';

  constructor(
    private chatService: ChatService
  ) {

  }

  ngOnInit() {
    this.getMessageUser();
  }
  getMessageUser(){
    this.chatService.messageSubject.subscribe((message) => {
      this.message = message;
    });
  }

}
