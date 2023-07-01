import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmotionDetectorService } from 'src/app/services/emotionDetector/emotion-detector.service';
import { ChatService } from '../../services/chat/chat.service';
import { SECRET_PROMPT } from 'src/app/constants/secret-prompt';
import { WhisperService } from 'src/app/services/whisper/whisper.service';
import { TextToSpeechService } from 'src/app/services/textToSpeech/text-to-speech.service';


@Component({
  selector: 'app-voice-button',
  templateUrl: './voice-button.component.html',
  styleUrls: ['./voice-button.component.scss'],
})
export class VoiceButtonComponent {
  showAnimation = false;
  messageControl = new FormControl();
  message = 'Hola saluda a cascabot';
  feeling: string = '';
  audioFile: File | null = null;
  resIa?: string;
  record: boolean = false;
  recorder: any;
  fileYes:boolean = false;

  constructor(
    private chatService: ChatService,
    private emotionService: EmotionDetectorService,
    private whisperService: WhisperService,
    private speechService: TextToSpeechService
  ) {}
  myForm = new FormGroup({
    message: new FormControl('', Validators.required),
    record: new FormControl(false),
  });

  ngOnInit() {
    this.chatService.startProcess$.subscribe(() => {
      this.showAnimation = true;
    });

    this.chatService.endProcess$.subscribe(() => {
      this.showAnimation = false;
    });
  }

  recording() {
    this.record = !this.record;

    if (!this.recorder) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
  }

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.recorder = new MediaRecorder(stream);
      this.recorder.start();
      this.recorder.ondataavailable = (event: { data: any }) => {
        const blob = event.data;
        const file = new File([blob], 'recording.mp3', { type: 'audio/mp3' });

        this.audioFile = file;
      };
    });
  }

  stopRecording() {
    this.recorder.stop();

    // Detener la fuente de audio para que no siga grabando
    const tracks = this.recorder.stream.getTracks();
    tracks.forEach((track: { stop: () => any }) => track.stop());
    this.recorder = null;
  }

  processRecordedAudio() {
    if (this.audioFile) {
      this.fileYes = true;

      this.whisperService
        .transcribeAudio(this.audioFile)
        .then((transcription) => {
          if (transcription) {
            this.sendMessage(transcription);
            this.audioFile = null;
          }
        });
    }
  }

  playRecordedAudio() {
    console.log(this.audioFile, 'audiofileshow');

    if (this.audioFile) {
      // Crear una nueva URL de objeto para el archivo de audio
      const audioURL = URL.createObjectURL(this.audioFile);

      // Crear un nuevo elemento de audio y reproducirlo
      const audio = new Audio(audioURL);
      this.processRecordedAudio();
      // audio.play();
    }
  }

  sendMessage(message?: string) {
    if (this.audioFile) {
      console.log(this.audioFile, 'audiobefore');

      // Si hay una grabación de audio pendiente, procesarla
      this.playRecordedAudio();
    } else {
      // Si no hay una grabación de audio pendiente, enviar el mensaje de texto
      const messageToSend = message || this.myForm.get('message')?.value;
      if (messageToSend) {
        const context = SECRET_PROMPT.SOYLA_BOT;
        this.chatService
          .sendMessage(messageToSend, context, 'gpt-3.5-turbo')
          .then((res: any) => {
            console.log('Así llega la respuesta de la IA:', this.resIa);
            this.resIa = res;
            if (this.resIa) {
              this.speechService.convertTextToSpeech(this.resIa);
         this.fileYes = false;

            }
            if (this.resIa) {
              this.getFeeling(this.resIa);
            }
          });

        this.myForm.patchValue({ message: '' });
      }
    }
  }

  getFeeling(message: string) {
    this.emotionService.getFeeling(message).then((res: any) => {
      this.feeling = res;
    });
  }

  finishConclution() {}
}
