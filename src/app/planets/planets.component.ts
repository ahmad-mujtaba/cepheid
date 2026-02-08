import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Body, Observer, SearchRiseSet, SearchHourAngle,
  Equator, Horizon, Illumination, Constellation, Elongation
} from 'astronomy-engine';
import { GeolocationService } from '../services/geolocation.service';
import { FORMAT_TIME } from '../services/constants/app.constants';
import { PlanetInfo } from '../interfaces/app.interface';
import moment from 'moment';

const PLANETS: { name: string; body: Body; inner: boolean }[] = [
  { name: 'Mercury', body: Body.Mercury, inner: true },
  { name: 'Venus', body: Body.Venus, inner: true },
  { name: 'Mars', body: Body.Mars, inner: false },
  { name: 'Jupiter', body: Body.Jupiter, inner: false },
  { name: 'Saturn', body: Body.Saturn, inner: false },
  { name: 'Uranus', body: Body.Uranus, inner: false },
  { name: 'Neptune', body: Body.Neptune, inner: false },
];

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
})
export class PlanetsComponent implements OnInit, OnDestroy {
  planets: PlanetInfo[] = [];
  private itvlId: any;

  constructor(private geolocationService: GeolocationService) {}

  ngOnInit(): void {
    this.compute();
    this.itvlId = setInterval(() => this.compute(), 60000);
  }

  compute() {
    const position = this.geolocationService.getGeolocation();
    const observer = new Observer(position.latitude, position.longitude, 0);
    const now = new Date();

    this.planets = PLANETS.map(p => {
      const eqJ2000 = Equator(p.body, now, observer, false, true);
      const eqOfDate = Equator(p.body, now, observer, true, true);
      const hor = Horizon(now, observer, eqOfDate.ra, eqOfDate.dec, 'normal');

      const rise = SearchRiseSet(p.body, observer, 1, now, 2);
      const set = SearchRiseSet(p.body, observer, -1, now, 2);
      const transit = SearchHourAngle(p.body, observer, 0, now);
      const illum = Illumination(p.body, now);
      const constel = Constellation(eqJ2000.ra, eqJ2000.dec);
      const elong = Elongation(p.body, now);

      return {
        name: p.name,
        altitude: Math.round(hor.altitude * 10) / 10,
        azimuth: Math.round(hor.azimuth * 10) / 10,
        magnitude: Math.round(illum.mag * 10) / 10,
        riseTime: rise ? moment(rise.date).format(FORMAT_TIME) : '—',
        setTime: set ? moment(set.date).format(FORMAT_TIME) : '—',
        transitTime: transit ? moment(transit.time.date).format(FORMAT_TIME) : '—',
        transitAltitude: transit ? Math.round(transit.hor.altitude * 10) / 10 : 0,
        constellation: constel.name,
        isUp: hor.altitude > 0,
        elongation: Math.round(elong.elongation * 10) / 10,
      };
    });
  }

  ngOnDestroy() {
    clearInterval(this.itvlId);
  }
}
