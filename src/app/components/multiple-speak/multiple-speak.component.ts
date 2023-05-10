import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-multiple-speak',
  templateUrl: './multiple-speak.component.html',
  styleUrls: ['./multiple-speak.component.scss'],
})
export class MultipleSpeakComponent {
  // Vamos a crear un componente que contenga conversaciones
  // sencillas en un lugar(banco) con un personaje principal (banquero
  // La intención es que pueda derivar en diferentes resultados
  // segun como uno hable con el personaje principal.
  //Para este ejemplo construiremos el escenario de un robo y como efectuarlo saliendo de forma victoriosa

  constructor(private chatService: ChatService) {}

  placeDetection: string = '';
  personDetection: string = '';
}
