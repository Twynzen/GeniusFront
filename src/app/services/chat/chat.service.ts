import { Injectable } from '@angular/core';
import { Subject, count } from 'rxjs';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';
import { environment } from '../../environments/environment';
import { SECRET_PROMPT } from '../../constants/secret-prompt';
import { engines } from '../../constants/engines';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private inicioProceso = new Subject<void>();
  private finProceso = new Subject<void>();

  configuration = new Configuration({
    apiKey: environment.GPT_API_KEY,
  });
  openai = new OpenAIApi(this.configuration);
  currentAiResponse: string = '';
  messageSubject = new Subject<string>();
  prompt: string = '';
  responseIa: string = '';
  conversationMemory: string = '';
  mostrarAnimacion: boolean = false;
  countMemory: number = 0;
  count = 0;

  constructor() {}

  get inicioProceso$() {
    return this.inicioProceso.asObservable();
  }

  get finProceso$() {
    return this.finProceso.asObservable();
  }

  sendMessage(prompt: string): any {
    let gptTurbo: boolean = true;
    let gptDavinci: boolean = false;

    if (gptTurbo) {
      let resIa: any = this.gptTurboEngine(prompt);

      return resIa;
    } else if (gptDavinci) {
      let resIa: any = this.davinciEngine(prompt);

      return resIa;
    } else {
      return '';
    }
  }

  async gptTurboEngine(prompt: string): Promise<string> {
    const context: string = SECRET_PROMPT.CULEBRA;
    this.inicioProceso.next();
    this.mostrarAnimacion = true;
    let completPromt: string = context + prompt + this.conversationMemory;
    const response = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: completPromt,
        },
      ],
    });
    let resIA: string = response.data.choices[0].message?.content!;
    this.memoryChat(prompt, resIA);
    this.mostrarAnimacion = true;
    this.finProceso.next();
    console.group('Información de petición');
    console.log('CONTEXTO:', context);
    console.log('PROMPT ACTUAL:', prompt);
    console.log('MEMORIA ACTUAL:', this.count++, this.conversationMemory);
    console.log('RESPUESTA IA:', resIA);
    console.groupEnd();

    return resIA;
  }

  async davinciEngine(prompt: string): Promise<string> {
    const response = await this.openai.createCompletion({
      prompt: SECRET_PROMPT.FILO_GUTIERREZ + prompt,
      model: engines.GPT_TURBO,
      max_tokens: 200,
      temperature: 0.9,
    });

    if (response.data) {
      let isArray: any =
        Array.isArray(response.data.choices) &&
        response.data.choices.length > 0;
      const responseIA: string | undefined = response.data.choices[0].text;
      if (isArray && responseIA) {
        console.log(response.data, 'DATA');
        console.log(responseIA, 'Respuesta del modelo');
        return responseIA;
      } else {
        console.log(response.data, 'DATA');
        console.error('El choices no es un array o está vacío');
        return 'Error';
      }
    } else {
      console.error('El choices no es un array o está vacío');
      return 'Error';
    }
  }

  memoryChat(memoryRemember: string, memoryResponseUser: string) {
    this.countMemory = +1;
    this.conversationMemory +=
      'Lo siguiente es una memoria de las conversaciones anterior: "';
    this.conversationMemory += `[Usuario] ${memoryRemember}\n`;
    this.conversationMemory += `[gpt-3.5-turbo] ${memoryResponseUser}\n`;
    this.conversationMemory += '"';
  }
}
