import { Component, OnInit, ViewChild } from '@angular/core';
import {LoadingController, IonSlides} from '@ionic/angular';

declare var google;

interface Marker {
  lat: number;
  lng: number;
  title: string;
  image: string;
  text: string;
  markerObj?: any;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChild(IonSlides) slides: IonSlides;

  mapRef = null;
  infoWindowRef = null;
  markers: Marker[] = [
    {
      lat: -33.51555080974272,
      lng: -70.71828389366198,
      title: 'Plaza Oeste',
      image: 'https://lh5.googleusercontent.com/p/AF1QipOCgzq_0DYB9AxD-ItTG01x2csLsSfWsawBCypc=w408-h306-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?'
    },
    {
      lat: -33.50831625044341,
      lng: -70.73444091370295,
      title: 'Estadio Municipal Benito Juárez',
      image: 'https://lh5.googleusercontent.com/p/AF1QipMGZeu88O8uZvFOX9PKug7gz-VRhhiXQ78hAFZU=w408-h306-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?'
    },
    {
      lat: -33.441424520951145,
      lng: -70.64430518275593,
      title: 'Cerro Santa Lucia',
      image: 'https://lh5.googleusercontent.com/p/AF1QipPIXxrXfshAD6eHbkGScPdNqYBwfJ6ol4qriq2n=w408-h306-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?'
    },
    {
      lat: -33.46263906783662,
      lng: -70.66018498301078,
      title: 'Movistar Arenas',
      image: 'https://lh5.googleusercontent.com/p/AF1QipOJOq3vm1Gfpa3d4dPR_ca2C240J_PBv701zRAE=w408-h544-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?'
    }
  ];

  constructor( 
    private loadingCtrl: LoadingController
    ){
      this.infoWindowRef = new google.maps.InfoWindow();
  }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const marker = this.markers[0];
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: {lat: marker.lat, lng: marker.lng},
      zoom: 15
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
    });
  }

  private addMaker(itemMarker: Marker) {
    const marker = new google.maps.Marker({
      position: { lat: itemMarker.lat, lng: itemMarker.lng },
      map: this.mapRef,
      title: itemMarker.title
    });
    return marker;
  }

  private loadMarkers(){
    this.markers.forEach(marker => {
      const markerObj = this.addMaker(marker);
      marker.markerObj = markerObj;
    });
  }

  async onSlideDidChange() {
    const currentSlide = await this.slides.getActiveIndex();
    const marker = this.markers[currentSlide];
    this.mapRef.panTo({lat: marker.lat, lng: marker.lng});
  }

}