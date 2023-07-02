import { Injectable } from '@angular/core';
import { Subject, count } from 'rxjs';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';
import { environment } from '../../environments/environment';
import { SECRET_PROMPT } from '../../constants/secret-prompt';
import { engines } from '../../constants/engines';
import { MemoryService } from '../memory/memory.service';

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

  constructor(private memoryService: MemoryService) {}

  get startProcess$() {
    return this.startProcess.asObservable();
  }

  get endProcess$() {
    return this.endProcess.asObservable();
  }

  sendMessage(prompt: string, context: string, model: string): any {
    switch (model) {
      case 'gpt-3.5-turbo':
        return this.gptTurboEngine(prompt, context);
      case 'davinci':
        return this.davinciEngine(prompt);
      default:
        console.error('Modelo no soportado');
        return '';
    }
  }

  async gptTurboEngine(prompt: string, context: string): Promise<string> {
    this.startProcess.next();
    this.showAnimation = true;
    let shouldGreet = false;

    if (this.count>=2) {
      shouldGreet = true;
    }
    const systemMessage = shouldGreet
      ? `${context}`
      : `${context} Continue the conversation with the user. Remember, you have already greeted the user. DO NOT greet him`;
    const completePrompt: string = prompt + this.conversationMemory;

    try {
      const response = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemMessage,
          },
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
      this.count++;

      this.endProcess.next();

      console.group(
        '%cRequest information',
        'color: green; font-weight: bold;'
      );
      console.log('%cCONTEXT:', 'color: blue;', context);
      console.log('%cCURRENT PROMPT:', 'color: blue;', prompt);
      console.log(
        '%cCURRENT MEMORY:',
        'color: blue;',
        this.memoryCount,
        this.conversationMemory
      );
      console.log('%cAI RESPONSE:', 'color: blue;', aiResponse);
      console.groupEnd();

      return aiResponse;
    } catch (error) {
      console.error('Error while processing the GPT-3.5 Turbo engine:', error);
      this.showAnimation = false;
      this.count++;

      this.endProcess.next();
      return 'Error al procesar la respuesta de la IA.';
    }
  }

  async davinciEngine(prompt: string): Promise<string> {
    const response = await this.openai.createCompletion({
      prompt: SECRET_PROMPT.FILO_GUTIERREZ + prompt,
      model: engines.TEXT_DAVINCI_003,
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

  async updateConversationMemory(
    memoryRemember: string,
    memoryResponseUser: string
  ) {
    this.memoryCount += 1;

    // Analizar la conversación antes de agregarla a la memoria
    const conversation = `[Usuario]: ${memoryRemember}\n[gpt-3.5-turbo]: ${memoryResponseUser}\n`;
    const analysis = await this.memoryService.analyzeConversation(conversation);

    // Agregar el análisis de la conversación a la memoria
    this.conversationMemory +=
      'Este es un analisis de tu anterior conversación, responde siempre teniendo presente este analisis: ////"';
    this.conversationMemory += analysis;
    this.conversationMemory += '"////';
  }
}
