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

  constructor() {}

  ngOnInit() {
    // Actualiza la hora cada segundo
    this.clockSubscription = interval(1000).subscribe(() => {
      this.clock = this.getCurrentTime();
      this.checkAlarm();
    });
  }
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  setAlarm() {
    this.alarmTime = this.alarmForm.get('alarm')?.value;
    if (this.alarmTime) {
      this.alarms.push(this.alarmTime);
    }
    this.alarmForm.reset();
  }

  checkAlarm() {
    this.alarms = this.alarms.filter((alarm) => {
      if (alarm === this.clock) {
        console.log('hola');

        this.showAlarmPopup(alarm);
        return false;
      }
      return true;
    });
  }
  showAlarmPopup(time: string) {
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
