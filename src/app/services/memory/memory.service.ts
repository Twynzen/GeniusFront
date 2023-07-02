import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemoryService {
  private inicioProceso = new Subject<void>();
  private finProceso = new Subject<void>();
  mostrarAnimacion: boolean = false;
  configuration = new Configuration({
    apiKey: environment.GPT_API_KEY,
  });
  openai = new OpenAIApi(this.configuration);

  constructor() {}

  async analyzeConversation(conversation: string): Promise<string> {
    this.inicioProceso.next(); // Notificar inicio del proceso
    this.mostrarAnimacion = true;


    const response = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that analyzes past conversations. Extract the key points and context from the following conversation.`,
        },
        {
          role: 'user',
          content: conversation,
        },
      ],
    });

    console.log(conversation, 'Conversación a analizar');
    let resIA: string = response.data.choices[0].message?.content!;

    console.log(resIA, 'Resultado del análisis de conversación');

    this.mostrarAnimacion = true;
    this.finProceso.next(); // Notificar fin del proceso
    return resIA;
  }
}
