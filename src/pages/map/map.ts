import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import {
  GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions,
  Marker, MarkerOptions,
  // LatLng, CameraPosition
} from '@ionic-native/google-maps';

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  // @ViewChild('map') map: GoogleMap;
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;

  constructor(
    private googleMaps: GoogleMaps,
    public navCtrl: NavController,
    public platform: Platform) { }


  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    // let element: HTMLElement = document.getElementById('map');

    // let map: GoogleMap = this.googleMaps.create(element);

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 6.223907,
          lng: -75.566497
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!')

        let markerOptions: MarkerOptions = {
          title: 'Cantizal',
          snippet: 'Nuestro nido de amor',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 6.223907,
            lng: -75.566497
          }
        };
    
        // let marker: Marker = 
        this.map.addMarker(markerOptions)
          .then((marker: Marker) => {
            // marker.showInfoWindow();
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });

    // this.map.addMarker({
    //   title: 'Ionic',
    //   icon: 'blue',
    //   animation: 'DROP',
    //   position: {
    //     lat: 43.0741904,
    //     lng: -89.3809802
    //   }
    // })
    //   .then(marker => {
    //     marker.on(GoogleMapsEvent.MARKER_CLICK)
    //       .subscribe(() => {
    //         alert('clicked');
    //       });
    //   });

    // create LatLng object
    // let ionic: LatLng = new LatLng(43.0741904, -89.3809802);

    // create CameraPosition
    // let position: CameraPosition<LatLng> = {
    //   target: ionic,
    //   zoom: 18,
    //   tilt: 30
    // };

    // move the map's camera to position
    // map.moveCamera(position);

    // create new marker
    // let markerOptions: MarkerOptions = {
    //   title: 'Ionic',
    //   icon: 'blue',
    //   animation: 'DROP',
    //   position: {
    //     lat: 43.0741904,
    //     lng: -89.3809802
    //   }
    // };

    // let marker: Marker = this.map.addMarker(markerOptions)
    //   .then((marker: Marker) => {
    //     marker.showInfoWindow();
    //   });
    //  }

    }

    initJSMaps(mapEle) {
      // let LatLng = new google.map.LatLng(43.071584, -89.380120);
      this.map = new google.maps.Map(mapEle.nativeElement, {
        center: { lat: 6.223714, lng: -75.566524 },
        // center: LatLng,
        zoom: 16
      });
    }

    // initNativeMaps(mapEle) {
    //   this.map = new GoogleMap(mapEle);
    //   mapEle.classList.add('show-map');

    //   GoogleMap.isAvailable().then(() => {
    //     const position = new GoogleMapsLatLng(43.074395, -89.381056);
    //     this.map.setPosition(position);
    //   });
    // }

    ionViewDidLoad() {
      // let mapEle = this.map;
      // let mapEle = document.getElementById('map');
      let mapEle = this.mapElement;

      // if (!mapEle) {
      //   console.error('Unable to initialize map, no map element with #map view reference.');
      //   return;
      // }

    //   // Disable this switch if you'd like to only use JS maps, as the APIs
    //   // are slightly different between the two. However, this makes it easy
    //   // to use native maps while running in Cordova, and JS maps on the web.
      if (this.platform.is('cordova') === true) {
        // this.initNativeMaps(mapEle);
      } else {
        this.initJSMaps(mapEle);
      }
    }

  // }
}
