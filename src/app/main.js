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

  constructor() {
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

  ngAfterViewInit() {
    // Init game setup
    this.draw();
    // Start the game loop
    setInterval(() => {
      this.runStep();
    }, 400);
  }

  runStep() {
    this.update();
    this.draw();
  }

  update() {
    const snakeDirection = this.snake.getDirection(this.relativeDirectionChangeRequest);
    this.snake.direction = snakeDirection;
    this.snake.move();
    // Reset direction change request, if any
    this.relativeDirectionChangeRequest = "";
  }

  draw() {
    // Clear canvas
    const canvasContext: CanvasRenderingContext2D = this.gridCanvas.nativeElement.getContext("2d");
    canvasContext.clearRect(0, 0, this.gridSettings.width, this.gridSettings.height);
    // Draw elements
    this.snake.draw();
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
