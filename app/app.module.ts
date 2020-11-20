import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component'
import { MapComponent } from './map/map.component';
import { ShowButtonComponent } from './show-button/show-button.component'

import { AppStateService } from './state/appstate.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  providers:    [ AppStateService ],
  declarations: [ AppComponent, HelloComponent, MapComponent, ShowButtonComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
