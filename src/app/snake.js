import {Component, ElementRef, Input, CanvasRenderingContext2D} from '@angular/core';

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
    // Default direction is up
    this.direction = 'up';
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

  move(direction: string) {
    // TODO check for ilegal moves
    // TODO check if snake hits itself (here or somwhere else)
    const head = this.segments[this.segments.length - 1];
    // Add new head
    switch (direction) {
      case 'down': {
        const newY = head.y === this.gridSettings.verticalCells ?
                      0 :
                      head.y + 1;
        this.segments.push({x: head.x, y: newY});
        break;
      }
      case 'up': {
        const newY = head.y === 0 ?
                      this.gridSettings.verticalCells - 1 :
                      head.y - 1;
        this.segments.push({x: head.x, y: newY});
        break;
      }
      case 'left': {
        const newX = head.x === 0 ?
                      this.gridSettings.horizontalCells - 1 :
                      head.x - 1;
        this.segments.push({x: newX, y: head.y});
        break;
      }
      case 'right': {
        const newX = head.x === this.gridSettings.horizontalCells ?
              0 :
              head.x + 1;
        this.segments.push({x: newX, y: head.y});
        break;
      }
      default:
        throw new Error(`direction not recognized: ${direction}`);
    }
    // Remove last segment
    this.segments.shift();
  }
}