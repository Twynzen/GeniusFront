import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SECRET_PROMPT } from 'src/app/constants/secret-prompt';
import { Configuration, OpenAIApi } from "openai";
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmotionDetectorService {

  private inicioProceso = new Subject<void>();
  private finProceso = new Subject<void>();
  mostrarAnimacion: boolean = false;
  configuration = new Configuration({
    apiKey: environment.GPT_API_KEY
  });
  openai = new OpenAIApi(this.configuration);

  constructor() { }

  async getFeeling(prompt: string): Promise<string> {
    this.inicioProceso.next(); // Notificar inicio del proceso
    this.mostrarAnimacion = true;
    let completPromt: string = SECRET_PROMPT.EMOTION_FILTER + prompt;

    const response = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'user',
          content: completPromt
        }
      ]
    })
    console.log(completPromt, "Prompt detector de emociones");
    let resIA: string = response.data.choices[0].message?.content!

    console.log(response.data, "respuesta de emoción catalogada");
    this.mostrarAnimacion = true;
    this.finProceso.next(); // Notificar fin del proceso
    return resIA;
  }
}
