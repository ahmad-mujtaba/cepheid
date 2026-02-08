import { Component, OnInit } from '@angular/core';
import {
  Seasons, SearchLunarEclipse, NextLunarEclipse,
  SearchGlobalSolarEclipse, NextGlobalSolarEclipse,
} from 'astronomy-engine';
import { AstroEvent } from '../interfaces/app.interface';
import moment from 'moment';
import { FORMAT_TIME_AND_DATE } from '../services/constants/app.constants';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  events: AstroEvent[] = [];

  ngOnInit(): void {
    this.compute();
  }

  compute() {
    const now = new Date();
    const year = now.getFullYear();
    const allEvents: AstroEvent[] = [];

    // Equinoxes and Solstices (this year + next year)
    for (const y of [year, year + 1]) {
      const seasons = Seasons(y);

      allEvents.push({
        name: 'March Equinox',
        date: seasons.mar_equinox.date,
        description: 'Sun crosses celestial equator northward',
        type: 'season',
      });
      allEvents.push({
        name: 'June Solstice',
        date: seasons.jun_solstice.date,
        description: 'Sun reaches northernmost declination',
        type: 'season',
      });
      allEvents.push({
        name: 'September Equinox',
        date: seasons.sep_equinox.date,
        description: 'Sun crosses celestial equator southward',
        type: 'season',
      });
      allEvents.push({
        name: 'December Solstice',
        date: seasons.dec_solstice.date,
        description: 'Sun reaches southernmost declination',
        type: 'season',
      });
    }

    // Lunar eclipses (next 5)
    let lunarEclipse = SearchLunarEclipse(now);
    for (let i = 0; i < 5; i++) {
      allEvents.push({
        name: this.capitalize(lunarEclipse.kind) + ' Lunar Eclipse',
        date: lunarEclipse.peak.date,
        description: `${Math.round(lunarEclipse.obscuration * 100)}% obscured`,
        type: 'lunar-eclipse',
      });
      lunarEclipse = NextLunarEclipse(lunarEclipse.peak);
    }

    // Solar eclipses (next 3)
    let solarEclipse = SearchGlobalSolarEclipse(now);
    for (let i = 0; i < 5; i++) {
      const locStr = solarEclipse.latitude != null && solarEclipse.longitude != null
        ? ` near ${solarEclipse.latitude!.toFixed(0)}°, ${solarEclipse.longitude!.toFixed(0)}°`
        : '';
      allEvents.push({
        name: this.capitalize(solarEclipse.kind) + ' Solar Eclipse',
        date: solarEclipse.peak.date,
        description: `Peak${locStr}`,
        type: 'solar-eclipse',
      });
      solarEclipse = NextGlobalSolarEclipse(solarEclipse.peak);
    }

    // Filter to future events, sort by date
    this.events = allEvents
      .filter(e => e.date.getTime() > now.getTime())
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  formatDate(date: Date): string {
    return moment(date).format('D MMM YYYY');
  }

  formatTimeDistance(date: Date): string {
    return moment(date).fromNow();
  }

  private capitalize(str: any): string {
    const s = String(str);
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
