import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextToSpeechService {
  constructor() {}

  convertTextToSpeech(text: string) {
    const synth = window.speechSynthesis;
    // const filteredText = this.filterResponsePipe.transform(text);
    const filteredText=text;
    const utterance = new SpeechSynthesisUtterance(filteredText);
    utterance.lang = 'es-ES'; // Cambia esto al idioma que prefieras
    synth.speak(utterance);
  }
}
