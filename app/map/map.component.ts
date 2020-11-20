import { Component, OnInit, Input, Output,  SimpleChanges, EventEmitter } from '@angular/core';
import ol from 'openlayers';
import { AppStateService } from '../state/appstate.service';
import { Subject } from 'rxjs/Subject';

const INITIAL_OPACITY = 1;
const DIMMED_OPACITY = 0.3;

@Component({
  selector: 'map',
  template: `<div id="map"></div>`,
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit{

  private map: ol.Map;

  constructor(private appStateService: AppStateService) {
  }

  ngOnInit() {
    
    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({ source: new ol.source.OSM(), opacity: INITIAL_OPACITY }),
      ],
      target: document.getElementById('map'),
      view: new ol.View({
        center: ol.proj.transform([-0.12755, 51.507222], 'EPSG:4326', 'EPSG:3857'),
        zoom: 3
      })
    });
    this.appStateService.getDim().subscribe(
      x => {
        if(x) {
          this.map.getLayers().getArray()[0].setOpacity(INITIAL_OPACITY);
      } else {
          this.map.getLayers().getArray()[0].setOpacity(DIMMED_OPACITY);
        }
      }
    )
  }

  
}