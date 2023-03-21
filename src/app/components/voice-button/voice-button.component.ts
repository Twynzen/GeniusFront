import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-voice-button',
  templateUrl: './voice-button.component.html',
  styleUrls: ['./voice-button.component.scss']
})
export class VoiceButtonComponent {

  mostrarAnimacion = false;
  messageControl = new FormControl();
  message = 'Hola saluda a cascabot';
  resIa?:string;
  record: boolean = false;
  recorder: any;
  constructor(
    private chatService: ChatService,
  ){

  }
  myForm = new FormGroup({
    message: new FormControl('', Validators.required),
    record: new FormControl(false)
  });

  ngOnInit() {
    this.chatService.inicioProceso$.subscribe(() => {
      this.mostrarAnimacion = true;
    });

    this.chatService.finProceso$.subscribe(() => {
      this.mostrarAnimacion = false;
    });
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

  sendMessage() {
    const message = this.myForm.get('message')?.value;
    if (message) {
       this.chatService.sendMessage(message).then((res: any )=> {
        this.resIa = ''
         this.resIa = res;
      });;

      this.myForm.patchValue({ message: '' });
    }
  }
}
