import { Injectable } from '@angular/core';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from './constants/app.constants';
import { USE_FAKE_LOCATION, FAKE_LATITUDE, FAKE_LONGITUDE } from '../../env/env';
import { Coordinates } from '../interfaces/app.interface';

const STORAGE_KEY_LAT = 'lat';
const STORAGE_KEY_LON = 'lon';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  setGeolocation(): Promise<Coordinates> {
    return new Promise((resolve) => {
      if (USE_FAKE_LOCATION) {
        localStorage.setItem(STORAGE_KEY_LAT, FAKE_LATITUDE.toString());
        localStorage.setItem(STORAGE_KEY_LON, FAKE_LONGITUDE.toString());
        resolve({ latitude: FAKE_LATITUDE, longitude: FAKE_LONGITUDE });
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((locationResult) => {
          localStorage.setItem(STORAGE_KEY_LAT, locationResult.coords.latitude.toString());
          localStorage.setItem(STORAGE_KEY_LON, locationResult.coords.longitude.toString());
          resolve({
            latitude: locationResult.coords.latitude,
            longitude: locationResult.coords.longitude,
          });
        }, (error) => {
          console.error('Error while getting geolocation: ', error);
          resolve(this.getGeolocation());
        }, { enableHighAccuracy: true, timeout: 10000 });
      } else {
        resolve(this.getGeolocation());
      }
    });
  }

  getGeolocation(): Coordinates {
    const lat = localStorage.getItem(STORAGE_KEY_LAT);
    const lon = localStorage.getItem(STORAGE_KEY_LON);

    return {
      latitude: lat ? parseFloat(lat) : DEFAULT_LATITUDE,
      longitude: lon ? parseFloat(lon) : DEFAULT_LONGITUDE,
    };
  }
}
