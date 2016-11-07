import {Component, ElementRef, Input, CanvasRenderingContext2D} from '@angular/core';

@Component({
  selector: 'sneaky-snek-snake',
  template: ''
})
export class SnakeComponent {
  @Input() gridCanvas: ElementRef;
  @Input() gridSettings: {};
  segments: {x: number, y: number}[];
  direction: string;
  startingLength: number;
  get head() {
    return this.segments[this.segments.length - 1];
  }

  constructor() {
    this.startingLength = 6;
  }

  spawn() {
    // Head is centered, rest of body appears to the bottom
    this.segments = [];
    for (let i = 0; i < this.startingLength; i++) {
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

  getNextHeadPosition() {
    // TODO check for ilegal moves
    let nextHeadPosition;
    switch (this.direction) {
      case 'down': {
        const newY = this.head.y === this.gridSettings.verticalCells ?
                      0 :
                      this.head.y + 1;
        nextHeadPosition = {x: this.head.x, y: newY};
        break;
      }
      case 'up': {
        const newY = this.head.y === 0 ?
                      this.gridSettings.verticalCells - 1 :
                      this.head.y - 1;
        nextHeadPosition = {x: this.head.x, y: newY};
        break;
      }
      case 'left': {
        const newX = this.head.x === 0 ?
                      this.gridSettings.horizontalCells - 1 :
                      this.head.x - 1;
        nextHeadPosition = {x: newX, y: this.head.y};
        break;
      }
      case 'right': {
        const newX = this.head.x === this.gridSettings.horizontalCells ?
              0 :
              this.head.x + 1;
        nextHeadPosition = {x: newX, y: this.head.y};
        break;
      }
      default:
        throw new Error(`direction not recognized: ${this.direction}`);
    }
    return nextHeadPosition;
  }

  move() {
    // Add new head
    this.segments.push(this.getNextHeadPosition());
    // Remove the last segment
    this.segments.shift();
  }

  grow() {
    // Just add new head
    this.segments.push(this.getNextHeadPosition());
  }

  getDirection(relativeDirectionChange: string) {
    if (relativeDirectionChange) {
      switch (relativeDirectionChange) {
        case 'left':
          switch (this.direction) {
            case 'down':
              return 'right';
            case 'up':
              return 'left';
            case 'left':
              return 'down';
            case 'right':
              return 'up';
            default:
              throw new Error(`direction not recognized: ${this.direction}`);
          }
        case 'right':
          switch (this.direction) {
            case 'down':
              return 'left';
            case 'up':
              return 'right';
            case 'left':
              return 'up';
            case 'right':
              return 'down';
            default:
              throw new Error(`direction not recognized: ${this.direction}`);
          }
        default:
          throw new Error(`relative direction change not recognized: ${relativeDirectionChange}`);
      }
    } else {
      return this.direction;
    }
  }

  isDead() {
    // If the head hit the body, snake is dead
    return this.segments.filter(segment => segment.x === this.head.x && segment.y === this.head.y).length > 1;
  }
}
