import {Component, ViewChild, ElementRef, CanvasRenderingContext2D} from '@angular/core';
import {SnakeComponent} from './snake';
import {PelletComponent} from './pellet';
const _ = require('lodash');
const Random = require("random-js")();

@Component({
  selector: 'sneaky-snek-app',
  template: require('./main.html'),
  directives: [PelletComponent]
})
export class MainComponent {
  @ViewChild("gridCanvas") gridCanvas: ElementRef;
  @ViewChild("snake") snake: SnakeComponent;
  @ViewChild("gameArea") gameArea: ElementRef;
  pellets: [];
  gridSettings: {};
  directionChangeRequest: string;
  running: true;
  intervalLoopId: number;
  playButtonText: string;
  pelletsCount: number;
  score: number;
  highScore: number;

  constructor() {
    this.playButtonText = "Play";
    this.score = 0;
    this.highScore = 0;
    this.pellets = [];
    this.pelletsCount = 8;
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
    this.score = 0;
    // Set focus in the canvas so keypresses act directly on it
    this.gameArea.nativeElement.focus();
    // Spawn game elements
    this.spawnElements();
    // Init game draw
    this.draw();
    // Start the game loop
    this.intervalLoopId = setInterval(() => {
      this.runStep();
    }, 150);
  }

  stop() {
    clearInterval(this.intervalLoopId);
    this.playButtonText = "Play again";
    this.running = false;
    // Update max score if we did well this game
    if (this.highScore < this.score) {
      this.highScore = this.score;
    }
  }

  runStep() {
    this.update();
    this.draw();
  }

  spawnElements() {
    this.snake.spawn();
    for (let i = 0; i < this.pelletsCount; i++) {
      this.addPellet();
    }
  }

  update() {
    // Recalculate snake direction and next head position
    if (this.directionChangeRequest) {
      this.snake.changeDirection(this.directionChangeRequest);
    }
    const nextHeadPosition = this.snake.getNextHeadPosition();
    // If snake is moving on top of pellet, eat it
    const ediblePellet = _.find(this.pellets, {position: nextHeadPosition});
    if (ediblePellet) {
      // Remove it from active pellets
      _.pull(this.pellets, ediblePellet);
      // Increase score
      this.score++;
      // Grow snake
      this.snake.grow();
    } else {
      // Just move snake
      this.snake.move();
    }
    // Scrap direction change request for this step, if any
    this.directionChangeRequest = "";
    // If the snake died, stop game
    const isDead = this.snake.isDead();
    if (isDead) {
      this.stop();
    }
    // Remove expired pellets
    _.remove(this.pellets, pellet => {
      return pellet.expired;
    });
    // add more pellets until we have pelletsCount again, in case we removed any
    for (let i = this.pellets.length; i < this.pelletsCount; i++) {
      this.addPellet();
    }
  }

  addPellet() {
    // Choose a random position that does not collide with other game elements TODO let game elements decide if a position is taken by them
    let randomPosition;
    let positionTaken = false;
    do {
      randomPosition = {
        x: Random.integer(0, this.gridSettings.horizontalCells - 1),
        y: Random.integer(0, this.gridSettings.verticalCells - 1)
      };
      positionTaken = _.some(this.snake.segments, randomPosition) ||
                      _.some(this.pellets, {position: randomPosition});
    } while (positionTaken);
    // Create pellet and add to array
    const pellet = new PelletComponent();
    pellet.gridCanvas = this.gridCanvas;
    pellet.gridSettings = this.gridSettings;
    pellet.spawn(randomPosition.x, randomPosition.y);
    this.pellets.push(pellet);
  }

  draw() {
    // Clear canvas
    const canvasContext: CanvasRenderingContext2D = this.gridCanvas.nativeElement.getContext("2d");
    canvasContext.clearRect(0, 0, this.gridSettings.width, this.gridSettings.height);
    // Draw elements
    this.snake.draw();
    this.pellets.forEach(pellet => pellet.draw());
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
        // Set (or overwrite) a direction change request for the next game update
        this.directionChangeRequest = "left";
        // Stop keypress from having any other effects outside the game
        return false;
      case 'ArrowRight':
        this.directionChangeRequest = "right";
        return false;
      case 'ArrowUp':
        this.directionChangeRequest = "up";
        return false;
      case 'ArrowDown':
        this.directionChangeRequest = "down";
        return false;
      default:
        break;
    }
  }
}
