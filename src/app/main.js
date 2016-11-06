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
    this.snake.move(this.snake.direction);
  }

  draw() {
    // Clear canvas
    const canvasContext: CanvasRenderingContext2D = this.gridCanvas.nativeElement.getContext("2d");
    canvasContext.clearRect(0, 0, this.gridSettings.width, this.gridSettings.height);
    // Draw elements
    this.snake.draw();
  }

}
