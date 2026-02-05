import { Injectable } from '@angular/core';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from './constants/app.constants';
import { USE_FAKE_LOCATION, FAKE_LATITUDE, FAKE_LONGITUDE } from '../../env/env';
import { Coordinates } from '../interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  setGeolocation() {

    if (USE_FAKE_LOCATION) {
      localStorage.setItem('lat', FAKE_LATITUDE.toString());
        localStorage.setItem('lon', FAKE_LONGITUDE.toString());
    } else {
      navigator.geolocation.getCurrentPosition((locationResult) => {
        localStorage.setItem('lat', locationResult.coords.latitude.toString());
        localStorage.setItem('lon', locationResult.coords.longitude.toString());
      }, (error) => {
        console.error('Error while getting geolocation: ', error);
      }, { enableHighAccuracy: true });
    }
    
  }
  getGeolocation() {

    const lat = localStorage.getItem('lat') || DEFAULT_LATITUDE;
    const lon = localStorage.getItem('long') || DEFAULT_LONGITUDE;

    const location: Coordinates = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
    }
    return location;
  }
}
