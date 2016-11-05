import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {TechsModule} from './techs';

import {MainComponent} from './main';

@NgModule({
  imports: [
    BrowserModule,
    TechsModule
  ],
  declarations: [
    MainComponent
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}
