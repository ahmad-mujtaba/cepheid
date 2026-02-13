import { Component, OnInit, OnDestroy } from '@angular/core';
import { Body, DefineStar, HourAngle, Observer, SearchAltitude, SearchRiseSet, SiderealTime } from 'astronomy-engine';
import { GeolocationService } from '../services/geolocation.service';
import { DARK_ALTITUDE, FORMAT_TIME, FORMAT_TIME_AND_DATE, FORMAT_TIME_SHORT } from '../services/constants/app.constants';
import moment from 'moment'
import { MaterialModule } from '../material.module';
import { durationToString } from '../util/utility';

const POLARIS_RA = 3.1;
const POLARIS_DEC = 89.2642;
const POLARIS_DIST_LY = 431;

@Component({
  selector: 'app-night',
  imports: [MaterialModule],
  templateUrl: './night.component.html',
  styleUrl: './night.component.scss'
})
export class NightComponent implements OnInit, OnDestroy {

  timeToChangeStr: string = '';
  nextTimeStr: string = '';
  nextSunStr: string = '';
  isDaylight : boolean = false;

  polarisX: number = 40;
  polarisY: number = 20;
  polarisHAStr: string = '';

  itvlId: any;


  constructor(private geolocationService: GeolocationService) {

  }

  ngOnInit() {

    this.render();
    this.itvlId = setInterval(() => this.render(), 10000);
  }

  render() {
    const location = this.geolocationService.getGeolocation();
    const observer = new Observer(location.latitude, location.longitude, 0);
    const now = new Date();

    const nextDarkTime = SearchAltitude(Body.Sun, observer, -1, now, 365, DARK_ALTITUDE);
    const nextDawnTime = SearchAltitude(Body.Sun, observer, 1, now, 365, DARK_ALTITUDE);

    if (nextDarkTime && nextDawnTime) {
      this.isDaylight = nextDarkTime?.tt < nextDawnTime?.tt;
    }

    const sunset = SearchRiseSet(Body.Sun, observer, -1, now, 365);
    const sunrise = SearchRiseSet(Body.Sun, observer, 1, now, 365);


    let duration;
    if (this.isDaylight) {
      // calculate time to dark
      duration = moment.duration(moment().diff(moment(nextDarkTime?.date)));
      this.nextTimeStr = moment(nextDarkTime?.date).format(FORMAT_TIME_SHORT) || '';
      this.nextSunStr = 'Sunset - ' + moment(sunset?.date).format(FORMAT_TIME_AND_DATE) || '';

    } else {
      // calculate time to dawn
      duration = moment.duration(moment().diff(moment(nextDawnTime?.date)));
      this.nextTimeStr = moment(nextDawnTime?.date).format(FORMAT_TIME_SHORT) || '';
      this.nextSunStr = 'Sunrise - ' +  moment(sunrise?.date).format(FORMAT_TIME_AND_DATE) || '';
    }

    this.timeToChangeStr = durationToString(duration);

    this.calculatePolarisPosition(now, observer);
  }

  private calculatePolarisPosition(now: Date, observer: Observer) {
    // Polaris hour angle for polar scope reticle
    //DefineStar(Body.Star2, POLARIS_RA, POLARIS_DEC, POLARIS_DIST_LY);
    // 1. Get the raw Hour Angle (usually returned in decimal hours 0-24)
DefineStar(Body.Star2, POLARIS_RA, POLARIS_DEC, POLARIS_DIST_LY);
const ha = HourAngle(Body.Star2, now, observer);

const st = SiderealTime(now);
const longHours = observer.longitude / 15;
let lst = st + longHours;
lst = lst % 24;
if (lst < 0) lst += 24;

let newHa = lst - POLARIS_RA;

// Normalize HA to [0, 24)
    newHa = ((newHa % 24) + 24) % 24;
    let clockHour2 = newHa / 2;
    
    // Round to 1 decimal place (e.g., 8.2 o'clock)
    const displayHour = Math.round(clockHour2 * 10) / 10;

// 2. Convert 24h HA to a 12h Clock format
// Formula: (HA / 2) gives the 12h equivalent. 
// We use modulo 12 to ensure 12.5h becomes 0.5h, etc.
let clockHour = (ha / 2) % 12;
if (clockHour === 0) clockHour = 12; 

// Rounding to 1 decimal place for the string display
this.polarisHAStr = `${(Math.round(clockHour * 10) / 10).toFixed(1)}  ${displayHour} o'clock`;

// 3. Coordinate Mapping (Trigonometry)
// In a standard polar scope: 0h (or 12 o'clock) is at the TOP (Positive Y)
// Hour Angle increases CLOCKWISE.
// Standard Math.sin/cos starts at 3 o'clock and goes COUNTER-CLOCKWISE.
// To fix this: Swap Sin/Cos and adjust signs.
let angleRad = ha * (2 * Math.PI / 24); 


const cx = 40; 
const cy = 40; // Ensure you have a center Y
const orbitR = 20;

// Corrected Mapping:
// Sin(angle) handles horizontal offset (X)
// Cos(angle) handles vertical offset (Y). 
// Subtraction from cy moves the point UP when Cos is positive (0h HA).
this.polarisX = cx + orbitR * Math.sin(angleRad);
this.polarisY = cy - orbitR * Math.cos(angleRad);
  }



  ngOnDestroy() {
    clearInterval(this.itvlId);
  }

}
