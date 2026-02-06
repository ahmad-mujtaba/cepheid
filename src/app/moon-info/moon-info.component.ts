import { Component, OnInit, OnDestroy } from '@angular/core';
import { AstroTime, Body, Illumination, IlluminationInfo, MoonPhase, Observer, SearchAltitude, SearchRiseSet } from 'astronomy-engine';
import { DARK_ALTITUDE, FORMAT_TIME, MOON_PHASES } from '../services/constants/app.constants';
import { GeolocationService } from '../services/geolocation.service';
import moment from 'moment';
import { durationToString } from '../util/utility';

@Component({
  selector: 'app-moon-info',
  imports: [],
  templateUrl: './moon-info.component.html',
  styleUrl: './moon-info.component.scss'
})
export class MoonInfoComponent implements OnInit, OnDestroy {
  phase: string = '';
  nextMoonStr: string = '';

  phaseFraction: number = 0;
  phaseAngle: number = 0;
  illuminationInfo: IlluminationInfo | undefined;
  itvlId: any;
  moonWindowStr: string = '';

  constructor(private geolocationService: GeolocationService) {
  }

  ngOnInit(): void {
    this.render();
    this.itvlId = setInterval(() => this.render(), 10000);
  }

  render() {
    const position = this.geolocationService.getGeolocation();
    const observer = new Observer(position.latitude, position.longitude, 0);

    const dateNow = new Date('Feb 14 2026 22:21:16 GMT+0530 (India Standard Time)');
    const moonPhaseAngle = MoonPhase(dateNow);
    this.phaseAngle = moonPhaseAngle;
    this.phase = this.getMoonPhaseName(moonPhaseAngle);

    this.illuminationInfo = Illumination(Body.Moon, dateNow);

    this.phaseFraction = Math.round(this.illuminationInfo.phase_fraction * 100);

    const moonset = SearchRiseSet(Body.Moon, observer, -1, dateNow, 365);
    const moonrise = SearchRiseSet(Body.Moon, observer, 1, dateNow, 365);

    const nextDarkTime = SearchAltitude(Body.Sun, observer, -1, dateNow, 365, DARK_ALTITUDE);
    const nextDawnTime = SearchAltitude(Body.Sun, observer, 1, dateNow, 365, DARK_ALTITUDE);

    if (moonset && moonrise) {
      if (moonset?.tt < moonrise?.tt) {
        this.nextMoonStr = 'Moonset at ' + moment(moonset.date).format(FORMAT_TIME);
      } else {
        this.nextMoonStr = 'Moonrise at ' + moment(moonrise.date).format(FORMAT_TIME);
      }

      if (nextDarkTime && nextDawnTime) {
        if (moonrise.tt > nextDarkTime.tt) {
          this.moonWindowStr = 'Dark : ' + this.getDiffDuration(moonrise, nextDarkTime) + ' from ' + moment(nextDarkTime.date).format(FORMAT_TIME) + ' to ' + (nextDawnTime.tt > moonrise.tt ? moment(moonrise.date).format(FORMAT_TIME) : moment(nextDawnTime.date).format(FORMAT_TIME));
        } else if (moonset.tt < nextDawnTime.tt) {
          this.moonWindowStr = 'Dark : ' + this.getDiffDuration(moonset, nextDawnTime) + ' from ' + moment(moonset.date).format(FORMAT_TIME) + ' to ' + moment(nextDawnTime.date).format(FORMAT_TIME);
        }
      }
    }
  }

  getDiffDuration(astroTime1: AstroTime, astroTime2: AstroTime) {
    return durationToString(moment.duration(moment(astroTime1.date).diff(moment(astroTime2.date))));
  }

  ngOnDestroy() {
    clearInterval(this.itvlId);
  }

  getMoonWidth(): number {
    // Convert phase angle to illumination width for visual display
    // 0° = new moon (0%), 90° = first quarter (50%), 180° = full (100%), 270° = third quarter (50%)
    if (this.phaseAngle <= 180) {
      return (this.phaseAngle / 180) * 100;
    } else {
      return ((360 - this.phaseAngle) / 180) * 100;
    }
  }

  getMoonPhaseName(phaseAngle: number) {

    let phaseNameStr = '';

    if (phaseAngle >= 0 && phaseAngle < 12) {
      phaseNameStr = MOON_PHASES.NEW_MOON;
    } else if (phaseAngle >= 12 && phaseAngle < 78) {
      phaseNameStr = MOON_PHASES.WAXING_CRESCENT;
    } else if (phaseAngle >= 78 && phaseAngle < 102) {
      phaseNameStr = MOON_PHASES.FIRST_QUARTER;
    } else if (phaseAngle >= 102 && phaseAngle < 168) {
      phaseNameStr = MOON_PHASES.WAXING_GIBBOUS;
    } else if (phaseAngle >= 168 && phaseAngle < 192) {
      phaseNameStr = MOON_PHASES.FULL_MOON;
    } else if (phaseAngle >= 192 && phaseAngle < 258) {
      phaseNameStr = MOON_PHASES.WANING_GIBBOUS;
    } else if (phaseAngle >= 258 && phaseAngle < 282) {
      phaseNameStr = MOON_PHASES.THIRD_QUARTER;
    } else if (phaseAngle >= 282 && phaseAngle < 348) {
      phaseNameStr = MOON_PHASES.WANING_CRESCENT;
    } else if (phaseAngle >= 348 && phaseAngle <= 360) {
      phaseNameStr = MOON_PHASES.NEW_MOON;
    }
    return phaseNameStr;
  }
}
