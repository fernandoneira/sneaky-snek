import {Component, ViewChild, ElementRef, CanvasRenderingContext2D} from '@angular/core';
import {SnakeComponent} from './snake';

@Component({
  selector: 'sneaky-snek-app',
  template: require('./main.html')
})
export class MainComponent {
  @ViewChild("gridCanvas") gridCanvas: ElementRef;
  @ViewChild("snake") snake: SnakeComponent;
  gridSettings: {};
  relativeDirectionChangeRequest: string;
  running: true;
  intervalLoopId: number;
  playButtonText: string;

  constructor() {
    this.playButtonText = "Play";
    // 800/16 = 50x50 cells
    const gridWidth = 800;
    const gridHeight = 800;
    const cellSize = 16; // width=height, cells are always square
    this.gridSettings = {
      width: gridWidth,
      height: gridHeight,
      cellSize,
      horizontalCells: (gridWidth / cellSize),
      verticalCells: (gridWidth / cellSize)
    };
  }

  start() {
    this.running = true;
    // Spawn game elements
    this.spawnElements();
    // Init game draw
    this.draw();
    // Start the game loop
    this.intervalLoopId = setInterval(() => {
      this.runStep();
    }, 400);
  }

  stop() {
    clearInterval(this.intervalLoopId);
    this.playButtonText = "Play again";
    this.running = false;
  }

  runStep() {
    this.update();
    this.draw();
  }

  spawnElements() {
    this.snake.spawn();
  }

  update() {
    // Move snake in the proper direction
    const snakeDirection = this.snake.getDirection(this.relativeDirectionChangeRequest);
    this.snake.direction = snakeDirection;
    this.snake.move();
    // Scrap direction change request for this step, if any
    this.relativeDirectionChangeRequest = "";
    // If the snake died, stop game
    const isDead = this.snake.isDead();
    if (isDead) {
      this.stop();
    }
  }

  draw() {
    // Clear canvas
    const canvasContext: CanvasRenderingContext2D = this.gridCanvas.nativeElement.getContext("2d");
    canvasContext.clearRect(0, 0, this.gridSettings.width, this.gridSettings.height);
    // Draw elements
    this.snake.draw();
  }

  onClickPlay() {
    if (this.running) {
      console.warn("User clicked play button but game is already running");
    } else {
      this.start();
    }
  }

  onKey(event: any) {
    console.log(event, event.keyCode, event.keyIdentifier);
    switch (event.key) {
      case 'ArrowLeft':
        // Set (or overwrite) a direction change to the left request for the next game update
        this.relativeDirectionChangeRequest = "left";
        break;
      case 'ArrowRight':
        // Set (or overwrite) a direction change to the right request for the next game update
        this.relativeDirectionChangeRequest = "right";
        break;
      default:
        break;
    }
  }
}
