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
  responseIa: string = '';

  constructor() { }

  sendMessage(prompt: string): any{
    let gptTurbo: boolean = true;
    let gptDavinci: boolean = false;

    if (gptTurbo) {
      let resIa: any = this.gptTurboEngine(prompt);;

      return resIa;

    } else if(gptDavinci) {
      let resIa: any = this.davinciEngine(prompt);

      return resIa

    }else{
      return '';
    }


  }
  async gptTurboEngine(prompt: string): Promise<string> {
    let completPromt: string = SECRET_PROMPT.FILO_GUTIERREZ + prompt;

    const response = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'user',
          content: SECRET_PROMPT.FILO_GUTIERREZ2 + prompt
        }
      ]
    })
    console.log(completPromt, "lo que digo yo");
    let memoryConversation: string = '';
      let resIA: string = response.data.choices[0].message?.content!

    console.log(response.data, "respuesta");
    return response.data.choices[0].message?.content!;
  }
  async davinciEngine(prompt: string): Promise<string> {

    const response = await this.openai.createCompletion({
      prompt: SECRET_PROMPT.FILO_GUTIERREZ+ prompt,
      model: engines.GPT_TURBO,
      max_tokens: 200,
      temperature: 0.9,
    })

    if (response.data) {
      let isArray: any = Array.isArray(response.data.choices) && response.data.choices.length > 0;
      const responseIA: string | undefined = response.data.choices[0].text;
      if (isArray && responseIA) {
        console.log(response.data, "DATA");
        console.log(responseIA, "Respuesta del modelo");
        return responseIA;
      } else {
        console.log(response.data, "DATA");
        console.error("El choices no es un array o está vacío");
        return 'Error';
      }

    } else {
      console.error("El choices no es un array o está vacío");
      return 'Error';
    }

  }





}
