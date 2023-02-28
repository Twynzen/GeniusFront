import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messageSubject = new Subject<string>();

  sendMessage(message: string) {
    this.messageSubject.next(message);
  }
}
