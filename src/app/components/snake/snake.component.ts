import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent {
  @ViewChild('myCanvas') canvasRef: ElementRef = {} as ElementRef;
  private context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  private blockSize = 10; // Tamaño de los bloques
  private width = 600; // Ancho del canvas
  private height = 600; // Alto del canvas
  private snake: Array<{ x: number, y: number }> = []; // Coordenadas de los bloques de la serpiente
  private apple: { x: number, y: number } = {} as { x: number, y: number }; // Coordenadas de la manzana
  private score = 0; // Puntuación del jugador
  private direction = 'right'; // Dirección actual de la serpiente
  private gameLoop: any; // Intervalo del juego
  private paused = false;
  count: number = 0;


  constructor(
    private chatService: ChatService,

  ){

  }


  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');

    // Inicializar la serpiente y la manzana
    this.initSnake();
    this.spawnApple();

    // Iniciar el bucle de juego
    this.gameLoop = setInterval(() => {
      this.update();
      this.draw();
    }, 100);
  }

  initSnake() {
    // Inicializar la serpiente con 3 bloques en el centro del canvas
    const x = Math.floor(this.width / 2 / this.blockSize) * this.blockSize;
    const y = Math.floor(this.height / 2 / this.blockSize) * this.blockSize;
    this.snake = [
      { x: x, y: y },
      { x: x - this.blockSize, y: y },
      { x: x - 2 * this.blockSize, y: y }
    ];
  }

  spawnApple() {
    // Generar una manzana en una posición aleatoria
    const x = Math.floor(Math.random() * (this.width - this.blockSize) / this.blockSize) * this.blockSize;
    const y = Math.floor(Math.random() * (this.height - this.blockSize) / this.blockSize) * this.blockSize;
    this.apple = { x: x, y: y };
  }

  update() {
    if (this.paused) return;
    // Actualizar la posición de la serpiente según su dirección
    const head = { x: this.snake[0].x, y: this.snake[0].y };
    switch (this.direction) {
      case 'up': head.y -= this.blockSize; break;
      case 'down': head.y += this.blockSize; break;
      case 'left': head.x -= this.blockSize; break;
      case 'right': head.x += this.blockSize; break;
    }
    this.snake.unshift(head);

    // Comprobar si la serpiente ha comido una manzana
    if (this.apple && this.apple.x === head.x && this.apple.y === head.y) {
      this.score++;
      this.spawnApple();
      this.paused = true; // Pausar el juego
      this.showMessage(); // Mostrar el mensaje del servicio de chat
    } else {
      this.snake.pop();
    }

    // Comprobar si la serpiente ha chocado contra una pared o contra sí misma
    if (head.x < 0 || head.x >= this.width || head.y < 0 || head.y >= this.height || this.snake.some((block, index) => index > 0 && block.x === head.x && block.y === head.y)) {
      clearInterval(this.gameLoop);
      alert('Game over! Score: ' + this.score);
    }
  }

  draw() {
    // Dibujar el fondo
    this.context.fillStyle = '#222';
    this.context.fillRect(0, 0, this.width, this.height);
    // Dibujar la serpiente
    this.context.fillStyle = '#fff';
    this.snake.forEach(block => {
      this.context.fillRect(block.x, block.y, this.blockSize, this.blockSize);
    });

    // Dibujar la manzana
    this.context.fillStyle = '#f00';
    this.context.fillRect(this.apple.x, this.apple.y, this.blockSize, this.blockSize);

    // Dibujar la puntuación
    this.context.fillStyle = '#fff';
    this.context.font = '20px Arial';
    this.context.fillText('Score: ' + this.score, 10, 30);
  }

  onKeyDown(event: KeyboardEvent) {
    // Cambiar la dirección de la serpiente según la tecla pulsada
    switch (event.key) {
      case 'ArrowUp': if (this.direction !== 'down') this.direction = 'up'; break;
      case 'ArrowDown': if (this.direction !== 'up') this.direction = 'down'; break;
      case 'ArrowLeft': if (this.direction !== 'right') this.direction = 'left'; break;
      case 'ArrowRight': if (this.direction !== 'left') this.direction = 'right'; break;
      case 'Enter': this.paused = !this.paused; break;
    }
    console.log(event.key);
  }
  async showMessage() {
    this.count = this.score;
    const apples: string = `Las manzanas que he comido son ${this.count.toString()} y pienso `;
    const message = await this.chatService.gptTurboEngine(apples);
    console.log(message,"manzanas?");


    alert(message); // Mostrar el mensaje en un prompt
    this.paused = false;

  }

}