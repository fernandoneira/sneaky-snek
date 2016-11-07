import {Component, ElementRef, Input, CanvasRenderingContext2D} from '@angular/core';

@Component({
  selector: 'sneaky-snek-pellet',
  template: ''
})
export class PelletComponent {
  @Input() gridCanvas: ElementRef;
  @Input() gridSettings: {};
  position: {x: number, y: number}[];
  timeToLive: number;
  expirationTimeoutId: number;
  expired: boolean;

  spawn(x: number, y: number) {
    this.position = {x, y};
    this.expired = false;
    // Random number between 4 and 10
    this.timeToLive = Math.floor(Math.random() * 7) + 4;
    // Set timeout for removal
    this.expirationTimeoutId = setTimeout(() => {
      this.expire();
    }, this.timeToLive * 1000);
  }

  expire() {
    this.expired = true;
  }

  draw() {
    const canvasContext: CanvasRenderingContext2D = this.gridCanvas.nativeElement.getContext("2d");
    const centerX = (this.position.x * this.gridSettings.cellSize) + (this.gridSettings.cellSize / 2);
    const centerY = (this.position.y * this.gridSettings.cellSize) + (this.gridSettings.cellSize / 2);
    const radius = (this.gridSettings.cellSize / 2) - 1;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    canvasContext.fillStyle = 'green';
    canvasContext.fill();
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = '#003300';
    canvasContext.stroke();
  }

}
