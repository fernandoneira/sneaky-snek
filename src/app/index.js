import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MainComponent} from './main';
import {SnakeComponent} from './snake';
import {PelletComponent} from './pellet';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    MainComponent,
    SnakeComponent,
    PelletComponent
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}
