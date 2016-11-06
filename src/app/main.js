import {Component, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'sneaky-snek-app',
  template: require('./main.html')
})
export class MainComponent {
  @ViewChild("gridCanvas") gridCanvas: ElementRef;
  gridWidth: number;
  gridHeight: number;
  cellSize: number; // width=height, cells are always square
  horizontalCells: number;
  verticalCells: number;

  constructor() {
    // 800/16 = 50x50 cells
    this.gridWidth = 800;
    this.gridHeight = 800;
    this.cellSize = 16;
    this.horizontalCells = this.gridWidth / this.cellSize;
    this.verticalCells = this.gridWidth / this.cellSize;
  }

  ngAfterViewInit() { // wait for the view to init before using the element
    const canvasContext: CanvasRenderingContext2D = this.gridCanvas.nativeElement.getContext("2d");
    // happy drawing from here on
    canvasContext.fillStyle = 'blue';
    // Sample snake segment
    canvasContext.fillRect(this.cellSize, this.cellSize, this.cellSize, this.cellSize);
  }
}
