import {SnakeComponent} from './snake';
import {canvasMock} from './utils/canvasMock';

describe('snake component', () => {
  let snakeComponent;

  beforeEach(() => {
    snakeComponent = new SnakeComponent();
    snakeComponent.gridCanvas = canvasMock();
    snakeComponent.gridSettings = {
      width: 800,
      height: 800,
      cellSize: 16,
      horizontalCells: 50,
      verticalCells: 50
    };
  });

  it('should spawn snake segments', () => {
    snakeComponent.spawn();
    expect(snakeComponent.segments).toBeDefined();
  });
  it('should spawn snake of starting length', () => {
    snakeComponent.spawn();
    expect(snakeComponent.segments.length).toBe(snakeComponent.startingLength);
  });
  it('should spawn snake head on the middle', () => {
    snakeComponent.spawn();
    expect(snakeComponent.head).toBe({x: 25, y: 25});
  });
  
  // todo write more tests

});

