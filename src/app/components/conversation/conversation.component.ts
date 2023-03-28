import { Component, OnInit } from '@angular/core';
import { EmotionDetectorService } from 'src/app/services/emotionDetector/emotion-detector.service';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent {
  message: string = '';

  constructor(
    private chatService: ChatService,

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
