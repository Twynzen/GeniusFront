import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(){
    //Error en el dotenv
    // dotenv.config();
  }

  messageSubject = new Subject<string>();
  prompt: string = ''

  configuration = new Configuration({
    apiKey:'api'
    // apiKey: process.env.GPT_API_KEY,
  });

  sendMessage(message: string) {
    this.messageSubject.next(message);
    console.log(message,"mensaje");
  }




}
