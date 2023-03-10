import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
import { environment } from '../environments/environment';
import { SECRET_PROMPT } from '../constants/secret-prompt';
import { engines } from '../constants/engines';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  configuration = new Configuration({
    apiKey: environment.GPT_API_KEY
  });
  openai = new OpenAIApi(this.configuration);
  currentAiResponse: string = '';
  messageSubject = new Subject<string>();
  prompt: string = ''

  constructor() { }

  async sendMessage(prompt: string) {
    const response = await this.openai.createCompletion({
      prompt: SECRET_PROMPT.FIRST_INSTRUCTION + prompt,
      model: engines.GPT_MODEL_DAVINCI,
      max_tokens: 200,
      temperature: 0.9,
    })

    if (response.data) {
      let isArray: any = Array.isArray(response.data.choices) && response.data.choices.length > 0;
      const responseIA: string | undefined = response.data.choices[0].text;
      if (isArray) {
        this.currentAiResponse != responseIA;
        console.log(response.data, "DATA");
        console.log(responseIA, "Respuesta del modelo");
        return
      } else {
        console.log(response.data, "DATA");
        console.error("El choices no es un array o está vacío");
        return
      }

    }
  }




}
