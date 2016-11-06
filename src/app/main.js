import {Component, ViewChild, ElementRef} from '@angular/core';
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
    this.snake.draw();
    // Start the game loop
    // setInterval(this.runStep, 500);

    const canvasContext = this.gridCanvas.nativeElement.getContext("2d");
    // happy drawing from here on
    canvasContext.fillStyle = 'blue';
    // Sample snake segment
    canvasContext.fillRect(this.cellSize, this.cellSize, this.cellSize, this.cellSize);
  }

  // runStep() {
  //   this.moveSnake();
  // }

  // moveSnake() {
  // }
}
