import { Component, OnInit } from '@angular/core';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  map = null;
  markers: Marker[] = [
    {
      position: {
        lat: -33.51555080974272,
        lng: -70.71828389366198,
      },
      title: 'Plaza Oeste'
    },
    {
      position: {
        lat: -33.50831625044341,
        lng: -70.73444091370295,
      },
      title: 'Estadio Municipal Benito Juárez'
    },
    {
      position: {
        lat: -33.441424520951145,
        lng: -70.64430518275593,
      },
      title: 'Cerro Santa Lucia'
    },
    {
      position: {
        lat: -33.46263906783662,
        lng: -70.66018498301078,
      },
      title: 'Movistar Arenas'
    },
  ];

  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: -33.515246582179515, lng: -70.71845196685176};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      mapEle.classList.add('show-map');
    });
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

}
