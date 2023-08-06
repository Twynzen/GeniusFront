import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { SECRET_PROMPT } from 'src/app/constants/secret-prompt';
import { AlarmInfo } from 'src/app/models/alarmInfo.interface';
import { ChatService } from 'src/app/services/chat/chat.service';
import { TextToSpeechService } from 'src/app/services/textToSpeech/text-to-speech.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss'],
})
export class AlarmComponent implements OnInit {
  clock: string = '';
  clockSubscription: Subscription = {} as Subscription;
  alarmForm: FormGroup = new FormGroup({
    alarm: new FormControl(''),
    description: new FormControl(''),
  });
  alarmTime: string | null = '';
  alarms: AlarmInfo[] = [];
  private alarmSound: any;
  showModal = false;
  selectedPrompt: keyof typeof SECRET_PROMPT = 'SOYLA_BOT';

  constructor(
    private chatService: ChatService,
    private speechService: TextToSpeechService
  ) {
    this.alarmSound = new Audio();
    this.alarmSound.src = 'assets/sounds/alarm.mp3'; // Asegúrate de que esta ruta apunta a tu archivo de audio
    this.alarmSound.load();
  }

  ngOnInit() {
    // Actualiza la hora cada segundo
    this.clockSubscription = interval(1000).subscribe(() => {
      this.clock = this.getCurrentTime();
      this.checkAlarm();
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveData(data: any) {
    this.selectedPrompt = data.selectedPrompt || 'SOYLA_BOT'; // Extrae selectedPrompt de los datos del formulario, o usa 'SOYLA_BOT' como valor predeterminado si no se proporcionó selectedPrompt
  }

  getCurrentTime(): string {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const midday = hours >= 12 ? 'PM' : 'AM';

    // Convertir a formato de 12 horas
    hours = hours % 12;
    // La hora '0' debe ser '12'
    hours = hours ? hours : 12;

    return `${hours.toString().padStart(2, '0')}:${minutes} ${midday}`;
  }

  playAlarmSound() {
    this.alarmSound.play();
  }
  stopAlarmSound() {
    this.alarmSound.pause();
  }

  setAlarm() {
    let alarmTime = this.alarmForm.get('alarm')?.value;
    let description = this.alarmForm.get('description')?.value;

    if (alarmTime) {
      // Convertir la hora de la alarma a formato de 12 horas
      let [hours, minutes] = alarmTime.split(':');
      hours = parseInt(hours);
      const midday = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      alarmTime = `${hours.toString().padStart(2, '0')}:${minutes} ${midday}`;

      // this.alarms.push(alarmTime);
      this.alarms.push({ time: alarmTime, description: description });
    }

    this.alarmForm.reset();
  }

  checkAlarm() {
    this.alarms = this.alarms.filter((alarm) => {
      if (alarm.time === this.clock) {
        this.showAlarmPopup(alarm); // Modificado
        return false;
      }
      return true;
    });
  }

  showAlarmPopup(alarm: AlarmInfo) {
    this.playAlarmSound();
    Swal.fire({
      title: '¡Alarma!',
      html: `<span class="text-white">La alarma establecida para las ${alarm.time} está sonando. ${alarm.description}</span>`,
      confirmButtonText: 'Ok',
      customClass: {
        container: 'bg-gray-800 text-white',
        title: 'text-yellow-500',
        confirmButton: 'bg-green-500 hover:bg-green-600',
      },
    }).then(() => {
      this.stopAlarmSound();

      const context = SECRET_PROMPT.DANIELMENTOR;
      const prompt = `SUENA LA ALARMA! "Descripción: (${alarm.description})"`;
      this.chatService
        .sendMessage(prompt, context, 'gpt-3.5-turbo')
        .then((response: any) => {
          this.speechService.convertTextToSpeech(response);
          Swal.fire({
            title: 'Respuesta de la IA',
            html: `<span class="text-black">${response}</span>`,
            icon: 'info',
            confirmButtonText: 'Ok',
            customClass: {
              container: 'bg-gray-800 text-white',
              title: 'text-yellow-500',
              confirmButton: 'bg-green-500 hover:bg-green-600',
            },
          });
        });
    });
  }

  ngOnDestroy() {
    this.clockSubscription.unsubscribe();
  }
}
