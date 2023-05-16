import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
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
  });
  alarmTime: string | null = '';
  alarms: string[] = [];
  private alarmSound: any;

  constructor() {
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

  setAlarm() {
    let alarmTime = this.alarmForm.get('alarm')?.value;

    if (alarmTime) {
      // Convertir la hora de la alarma a formato de 12 horas
      let [hours, minutes] = alarmTime.split(':');
      hours = parseInt(hours);
      const midday = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      alarmTime = `${hours.toString().padStart(2, '0')}:${minutes} ${midday}`;

      this.alarms.push(alarmTime);
    }

    this.alarmForm.reset();
  }

  checkAlarm() {
    this.alarms = this.alarms.filter((alarm) => {
      if (alarm === this.clock) {
        this.showAlarmPopup(alarm);
        return false;
      }
      return true;
    });
  }

  showAlarmPopup(time: string) {
    this.playAlarmSound();

    Swal.fire({
      title: '¡Alarma!',
      html: `<span class="text-white">La alarma establecida para las ${time} está sonando.</span>`,
      icon: 'info',
      confirmButtonText: 'Ok',
      customClass: {
        container: 'bg-gray-800 text-white',
        title: 'text-yellow-500',
        confirmButton: 'bg-green-500 hover:bg-green-600',
      },
    });
  }

  ngOnDestroy() {
    this.clockSubscription.unsubscribe();
  }
}
