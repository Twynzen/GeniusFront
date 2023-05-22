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
  private startProcess = new Subject<void>();
  private endProcess = new Subject<void>();

  configuration = new Configuration({
    apiKey: environment.GPT_API_KEY,
  });
  openai = new OpenAIApi(this.configuration);
  currentAiResponse: string = '';
  messageSubject = new Subject<string>();
  prompt: string = '';
  responseIa: string = '';
  conversationMemory: string = '';
  showAnimation: boolean = false;
  memoryCount: number = 0;
  count = 0;

  constructor() {}

  get startProcess$() {
    return this.startProcess.asObservable();
  }

  get endProcess$() {
    return this.endProcess.asObservable();
  }

  sendMessage(prompt: string, context: string): any {
    let gptTurbo: boolean = true;
    let gptDavinci: boolean = false;

    if (gptTurbo) {
      let resIa: any = this.gptTurboEngine(prompt, context);
      return resIa;
    } else if (gptDavinci) {
      let resIa: any = this.davinciEngine(prompt);
      return resIa;
    } else {
      return '';
    }
  }

  async gptTurboEngine(prompt: string, context: string): Promise<string> {
    this.startProcess.next();
    this.showAnimation = true;

    const completePrompt: string = context + prompt + this.conversationMemory;

    try {
      const response = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: completePrompt,
          },
        ],
      });

      const aiResponse: string = response.data.choices[0].message?.content!;
      //eliminar promtp para la memoria
      this.updateConversationMemory(prompt, aiResponse);
      this.showAnimation = false;
      this.endProcess.next();

      console.group('Request information');
      console.log('CONTEXT:', context);
      console.log('CURRENT PROMPT:', prompt);
      console.log(
        'CURRENT MEMORY:',
        this.memoryCount,
        this.conversationMemory
      );
      console.log('AI RESPONSE:', aiResponse);
      console.groupEnd();

      return aiResponse;
    } catch (error) {
      console.error('Error while processing the GPT-3.5 Turbo engine:', error);
      this.showAnimation = false;
      this.endProcess.next();
      return 'Error al procesar la respuesta de la IA.';
    }
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

  updateConversationMemory(memoryRemember: string, memoryResponseUser: string) {
    this.memoryCount += 1;
    this.conversationMemory = '';
    // en vez de sumar memoria, solicitar que se analice el pensamiento anterior para evolucionar
    // debe evolucionar por cada memoria, no solo recordarla, usarla para definirse
    this.conversationMemory +=
      'Como serpiente/culebra, Analiza y aprende de tu anterior conversación, para que la siguiente respuesta sea más inteligente: "';
      //cambiar nombre usuario a instrucción de realidad
    this.conversationMemory += `[Información sobre persepción de realidad]: ${memoryRemember}\n`;
    this.conversationMemory += `[gpt-3.5-turbo/serpiente/culebra]: ${memoryResponseUser}\n`;
    this.conversationMemory += '"';
  }
}
