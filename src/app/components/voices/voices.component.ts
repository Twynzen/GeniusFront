import { Component } from '@angular/core';

@Component({
  selector: 'app-voices',
  templateUrl: './voices.component.html',
  styleUrls: ['./voices.component.scss']
})
export class VoicesComponent {
  voices: SpeechSynthesisVoice[] = [];
  synth = window.speechSynthesis;
  inputText = '';

  constructor() {
    this.loadVoices();
  }

  loadVoices() {

    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
      };
    } else {
      this.voices = this.synth.getVoices();
    }
  }
  speak(synth: SpeechSynthesis, text: string, voice: SpeechSynthesisVoice) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voice.lang;
    utterance.voice = voice;
    synth.speak(utterance);
  }

}
