import {Component, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'sneaky-snek-snake',
  template: require('./snake.html')
})
export class SnakeComponent {
  @Input() gridCanvas: ElementRef;
  @Input() gridSettings: {};
  segments: {x: number, y: number}[];
  direction: string;

  ngAfterViewInit() {
    // Head is centered, rest of body appears to the right
    const startingLength = 6;
    this.segments = [];
    for (let i = 0; i < startingLength; i++) {
      this.segments.push(
        {
          x: this.gridSettings.horizontalCells / 2,
          y: (this.gridSettings.horizontalCells / 2) - i
        });
    }
  }

  draw() {
    const canvasContext: CanvasRenderingContext2D = this.gridCanvas.getContext("2d");
    // draw the segments
    for (const segment of this.segments) {
      const x = (segment.x * this.gridSettings.cellSize);
      const y = (segment.y * this.gridSettings.cellSize);
      canvasContext.fillStyle = '#16438c';
      canvasContext.fillRect(x + 1, y + 1, this.gridSettings.cellSize - 2, this.gridSettings.cellSize - 2);
      canvasContext.fillStyle = '#2463c9';
      canvasContext.fillRect(x + 3, y + 3, this.gridSettings.cellSize - 6, this.gridSettings.cellSize - 6);
    }
  }
}
