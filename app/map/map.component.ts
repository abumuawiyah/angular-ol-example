import {
  Component,
  OnInit,
  Input,
  Output,
  SimpleChanges,
  EventEmitter
} from "@angular/core";
import ol, { Coordinate } from "openlayers";
import { AppStateService } from "../state/appstate.service";
import { Subject } from "rxjs/Subject";

const INITIAL_OPACITY = 1;
const DIMMED_OPACITY = 0.3;

@Component({
  selector: "map",
  template: `
    <div id="map" tabindex="0"></div>
    <div id="geo-marker"></div>
  `,
  styleUrls: ["map.component.css"]
})
export class MapComponent implements OnInit {
  private map: ol.Map;
  private osm = new ol.source.OSM();

  constructor(private appStateService: AppStateService) {}

  ngOnInit() {
    let interval;
    let path: Coordinate[] = [
      [-5484116.753984261, -1884416.14606312],
      [-5484122.765236764, -1884331.5428025876],
      [-5484104.954118238, -1884303.7679013235],
      [-5484051.409443166, -1884282.2685246097],
      [-5483805.05941004, -1884105.3933610613],
      [-5483669.249631273, -1884063.0922822598],
      [-5483599.118352073, -1883979.3038447134],
      [-5483475.553717293, -1883769.6598181103]
    ];
    let sourceFeatures = new ol.source.Vector();
    let layerFeatures = new ol.layer.Vector({
      source: sourceFeatures
    });
    let lineString = new ol.geom.LineString([]);
    let layerRoute = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({ geometry: lineString })]
      }),
      style: [
        new ol.style.Style({
          stroke: new ol.style.Stroke({
            width: 3,
            color: "rgba(0, 0, 0, 1)",
            lineDash: [0.1, 5]
          }),
          zIndex: 2
        })
      ],
      updateWhileAnimating: true
    });
    this.map = new ol.Map({
      target: "map",
      view: new ol.View({
        center: [-5483805.05941004, -1884105.3933610613],
        zoom: 16,
        minZoom: 2,
        maxZoom: 20
      }),
      renderer: "canvas",
      layers: [
        new ol.layer.Tile({
          source: this.osm,
          opacity: 0.6
        }),
        layerRoute,
        layerFeatures
      ]
    });
    let markerEl = document.getElementById("geo-marker");
    let marker = new ol.Overlay({
      positioning: "center-center",
      offset: [0, 0],
      element: markerEl,
      stopEvent: false
    });
    this.map.addOverlay(marker);

    let fill = new ol.style.Fill({ color: "rgba(255,255,255,1)" });
    let stroke = new ol.style.Stroke({ color: "rgba(0,0,0,1)" });
    let style1 = [
      new ol.style.Style({
        image: new ol.style.Icon({
          scale: 0.7,
          opacity: 1,
          rotateWithView: false,
          anchor: [0.5, 1],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src:
            "//raw.githubusercontent.com/jonataswalker/map-utils/master/images/marker.png"
        }),
        zIndex: 5
      }),
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 6,
          fill: fill,
          stroke: stroke
        }),
        zIndex: 4
      })
    ];
    let feature1 = new ol.Feature({
      geometry: new ol.geom.Point(path[0])
    });
    let feature2 = new ol.Feature({
      geometry: new ol.geom.Point(path[path.length - 1])
    });

    feature1.setStyle(style1);
    feature2.setStyle(style1);
    sourceFeatures.addFeatures([feature1, feature2]);

    lineString.setCoordinates(path);

    //fire the animation
    this.map.once("postcompose", function(event) {
      console.info("postcompose");
      interval = setInterval(animation, 500);
    });

    let i = 0;
    let animation = function() {
      if (i == path.length) {
        i = 0;
      }

      marker.setPosition(path[i]);
      i++;
    };
  }
}
