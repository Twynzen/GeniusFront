import { Component, ViewChild, ElementRef } from '@angular/core';
import { SECRET_PROMPT } from 'src/app/constants/secret-prompt';
import { FilterResponsePipe } from 'src/app/pipes/filter-response/filter-response.pipe';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss'],
})
export class SnakeComponent {
  @ViewChild('myCanvas') canvasRef: ElementRef = {} as ElementRef;
  private context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  private blockSize = 10; // Tamaño de los bloques
  private width = 600; // Ancho del canvas
  private height = 600; // Alto del canvas
  private snake: Array<{ x: number; y: number }> = []; // Coordenadas de los bloques de la serpiente
  private apple: { x: number; y: number } = {} as { x: number; y: number }; // Coordenadas de la manzana
  private score = 0; // Puntuación del jugador
  private direction = 'right'; // Dirección actual de la serpiente
  private gameLoop: any; // Intervalo del juego
  paused: boolean = false;
  public messageToShow: string = '';
  showAnimation: boolean = false;
  count: number = 0;
  culebraGifUrl = './assets/img/culebrita.gif';
  public gameState: 'start' | 'running' | 'dead' = 'start';

  constructor(
    private chatService: ChatService,
    private filterResponsePipe: FilterResponsePipe
  ) {}

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');

    // Inicializar la serpiente y la manzana
    // this.initSnake();
    // this.spawnApple();
    this.drawWelcomeMessage();

    // Iniciar el bucle de juego
    this.gameLoop = setInterval(() => {
      if (this.gameState === 'running') {
        this.update();
        this.draw();
      }
    }, 100);
  }
  initSnake() {
    // Inicializar la serpiente con 3 bloques en el centro del canvas
    const x = Math.floor(this.width / 2 / this.blockSize) * this.blockSize;
    const y = Math.floor(this.height / 2 / this.blockSize) * this.blockSize;
    this.snake = [
      { x: x, y: y },
      { x: x - this.blockSize, y: y },
      { x: x - 2 * this.blockSize, y: y },
    ];
  }

  spawnApple() {
    // Generar una manzana en una posición aleatoria
    const x =
      Math.floor(
        (Math.random() * (this.width - this.blockSize)) / this.blockSize
      ) * this.blockSize;
    const y =
      Math.floor(
        (Math.random() * (this.height - this.blockSize)) / this.blockSize
      ) * this.blockSize;
    this.apple = { x: x, y: y };
  }

  drawWelcomeMessage() {
    const title = 'Culebra Consciente';
    const description = [
      'Por favor, cuídala. Si se golpea la cabeza, morirá.',
      '¡Presiona Enter para comenzar!',
    ];

    this.context.fillStyle = '#222';
    this.context.fillRect(0, 0, this.width, this.height);

    // Dibujar el título
    this.context.font = '30px Arial';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = '#fff';
    this.context.fillText(title, this.width / 2, this.height / 2 - 50);

    // Dibujar la descripción
    this.context.font = '20px Arial';
    description.forEach((line, index) => {
      this.context.fillText(line, this.width / 2, this.height / 2 + index * 30);
    });
  }

  update() {
    if (this.paused) return;
    // Actualizar la posición de la serpiente según su dirección
    const head = { x: this.snake[0].x, y: this.snake[0].y };
    switch (this.direction) {
      case 'up':
        head.y -= this.blockSize;
        break;
      case 'down':
        head.y += this.blockSize;
        break;
      case 'left':
        head.x -= this.blockSize;
        break;
      case 'right':
        head.x += this.blockSize;
        break;
    }
    this.snake.unshift(head);

    // Comprobar si la serpiente ha comido una manzana
    if (this.apple && this.apple.x === head.x && this.apple.y === head.y) {
      this.score++;
      this.spawnApple();
      this.paused = true;
      this.showAnimation = true; // Pausar el juego
      this.showMessage('apple'); // Mostrar el mensaje del servicio de chat
    } else {
      this.snake.pop();
    }

    // Comprobar si la serpiente ha chocado contra una pared o contra sí misma
    if (
      head.x < 0 ||
      head.x >= this.width ||
      head.y < 0 ||
      head.y >= this.height ||
      this.snake.some(
        (block, index) => index > 0 && block.x === head.x && block.y === head.y
      )
    ) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
      this.showMessage('dead');
      this.paused = true;
      this.showAnimation = true;
      this.gameState = 'dead';
    }
  }

  draw() {
    // Dibujar el fondo
    this.context.fillStyle = '#222';
    this.context.fillRect(0, 0, this.width, this.height);
    // Dibujar la serpiente
    this.context.fillStyle = '#fff';
    this.snake.forEach((block) => {
      this.context.fillRect(block.x, block.y, this.blockSize, this.blockSize);
    });

    // Dibujar la manzana
    this.context.fillStyle = '#f00';
    this.context.fillRect(
      this.apple.x,
      this.apple.y,
      this.blockSize,
      this.blockSize
    );

    // Dibujar la puntuación
    this.context.fillStyle = '#fff';
    this.context.font = '20px Arial';
    this.context.fillText('Score: ' + this.score, 10, 30);
  }
  initGame() {
    this.initSnake();
    this.spawnApple();
    this.score = 0;
    this.direction = 'right';
    this.paused = false;
    this.gameState = 'running';

    // Reiniciar el bucle de juego si está detenido
    if (!this.gameLoop) {
      this.gameLoop = setInterval(() => {
        this.update();
        this.draw();
      }, 100);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    // Cambiar la dirección de la serpiente según la tecla pulsada
    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== 'down') this.direction = 'up';
        break;
      case 'ArrowDown':
        if (this.direction !== 'up') this.direction = 'down';
        break;
      case 'ArrowLeft':
        if (this.direction !== 'right') this.direction = 'left';
        break;
      case 'ArrowRight':
        if (this.direction !== 'left') this.direction = 'right';
        break;
      case 'Enter':
        if (this.gameState === 'start' || this.gameState === 'dead') {
          this.initGame();
        } else {
          this.paused = !this.paused;
          if (this.showAnimation) {
            this.stopThinking();
          }
        }
        break;
    }
  }
  async showMessage(action: string) {
    this.count = this.score;
    const apples: string = `Las manzanas que ha comido son ${this.count.toString()}. La serpiente piensa: `;
    const dead: string = `La culebra se estrelló y se dio un golpe en la cabeza, la serpiente muere lentamente, manzanas totales:
  ${
    this.count === 0
      ? 'no logró comer ninguna manzana'
      : this.count.toString() + ' manzanas'
  }.
  Agonizante y muriendo: La serpiente piensa: `;
    const culebraContext = SECRET_PROMPT.CULEBRA;
    if (action === 'apple') {
      const message = this.filterResponsePipe.transform(
        await this.chatService.gptTurboEngine(apples, culebraContext)
      );
      this.messageToShow = message; // Asignar el valor de message a la propiedad
      this.convertTextToSpeech(this.messageToShow);
    } else {
      const message = this.filterResponsePipe.transform(
        await this.chatService.gptTurboEngine(dead, culebraContext)
      );
      this.messageToShow = message; // Asignar el valor de message a la propiedad
      this.convertTextToSpeech(this.messageToShow);
    }
  }

  stopThinking() {
    this.paused = false;
    this.showAnimation = false;
    this.messageToShow = '';
  }

  convertTextToSpeech(text: string) {
    const synth = window.speechSynthesis;
    const filteredText = this.filterResponsePipe.transform(text); // Aplica el pipe al texto
    const utterance = new SpeechSynthesisUtterance(filteredText);
    utterance.lang = 'es-ES'; // Cambia esto al idioma que prefieras
    synth.speak(utterance);
  }
}
