import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Configuration, OpenAIApi } from "openai";
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GptQuestToImproveService {

  private inicioProceso = new Subject<void>();
  private finProceso = new Subject<void>();
  mostrarAnimacion: boolean = false;
  configuration = new Configuration({
    apiKey: environment.GPT_API_KEY
  });
  openai = new OpenAIApi(this.configuration);

  constructor() { }

  async getOptimizationSuggestions(prompt: string): Promise<string> {
    this.inicioProceso.next(); // Notificar inicio del proceso
    this.mostrarAnimacion = true;
    const initialMessage = "Soy un Analista de código y experto en manejo de información que ayuda a optimizar proyectos.";

    const response = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'system',
          content: initialMessage
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    console.log(prompt, "Prompt de análisis de código y optimización");
    let resIA: string = response.data.choices[0].message?.content!

    console.log(response.data, "respuesta de análisis de código y optimización");
    this.mostrarAnimacion = true;
    this.finProceso.next(); // Notificar fin del proceso
    return resIA;
  }
}
