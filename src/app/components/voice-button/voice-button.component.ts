import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-voice-button',
  templateUrl: './voice-button.component.html',
  styleUrls: ['./voice-button.component.scss']
})
export class VoiceButtonComponent {

  messageControl = new FormControl();
  message = '';

  record: boolean = false;
  recorder: any;
  constructor(
    private chatService: ChatService
  ){

  }

  ngOnInit() {
    this.listenMessage();
  }
  recording(){
    this.record = !this.record;

    if (!this.recorder) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          this.recorder = new MediaRecorder(stream);
          this.recorder.start();

          this.recorder.ondataavailable = (event: { data: any; }) => {
            const blob = event.data;
            const file = new File([blob], 'recording.mp3', { type: 'audio/mp3' });

            console.log(file); // Aquí puedes enviar el archivo al backend
          }
        });
    } else {
      this.recorder.stop();
      this.recorder = null;

      // Detener la fuente de audio para que no siga grabando
      const tracks = this.recorder.stream.getTracks();
      tracks.forEach((track: { stop: () => any; }) => track.stop());
    }
  }
  listenMessage(){
    this.messageControl.valueChanges.subscribe((value) => {
      this.message = value;
    });
  }
  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.messageControl.setValue('');
  }


}
