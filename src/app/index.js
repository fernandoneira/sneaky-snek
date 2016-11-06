import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MainComponent} from './main';
import {SnakeComponent} from './snake';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    MainComponent,
    SnakeComponent
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}
