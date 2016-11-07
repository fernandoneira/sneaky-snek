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
  pellets: [];
  gridSettings: {};
  relativeDirectionChangeRequest: string;
  running: true;
  intervalLoopId: number;
  playButtonText: string;
  pelletsCount: number;

  constructor() {
    this.playButtonText = "Play";
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
    // Spawn game elements
    this.spawnElements();
    // Init game draw
    this.draw();
    // Start the game loop
    this.intervalLoopId = setInterval(() => {
      this.runStep();
    }, 250);
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
    for (let i = 0; i < this.pelletsCount; i++) {
      this.addPellet();
    }
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
    // TODO If snake is on top of pellet, eat it
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
    // Choose a random position that does not collide with other game elements todo let game elements decide if a position is taken by them
    let randomPosition;
    let positionTaken = false;
    do {
      randomPosition = {
        x: Random.integer(0, this.gridSettings.horizontalCells - 1),
        y: Random.integer(0, this.gridSettings.verticalCells - 1)
      };
      positionTaken = _.some(this.snake.segments, {x: randomPosition.x, y: randomPosition.y}) ||
                      _.some(this.pellets, {x: randomPosition.x, y: randomPosition.y});
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
