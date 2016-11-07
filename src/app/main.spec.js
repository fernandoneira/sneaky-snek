import {Component} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {MainComponent} from './main';

@Component({selector: 'sneeaky-snek-snake', template: ''})
class MockSnakeComponent {}
@Component({selector: 'sneeaky-snek-pellet', template: ''})
class MockPelletComponent {}

describe('Main Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        MockSnakeComponent,
        MockPelletComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render the snake and the pellets', () => {
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const main = fixture.nativeElement;
    expect(main.querySelector('sneeaky-snek-snake')).toBeDefined();
    expect(main.querySelector('sneeaky-snek-pellet')).toBeDefined();
  });

  // todo write more tests, fix existing

});
