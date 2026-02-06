import { Component, OnInit, OnDestroy } from '@angular/core';
import { Body, Observer, SearchAltitude, SearchRiseSet } from 'astronomy-engine';
import { GeolocationService } from '../services/geolocation.service';
import { DARK_ALTITUDE, FORMAT_TIME, FORMAT_TIME_AND_DATE } from '../services/constants/app.constants';
import moment from 'moment'
import { MaterialModule } from '../material.module';
import { durationToString } from '../util/utility';


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
    const now = new Date('Feb 14 2026 22:21:16 GMT+0530 (India Standard Time)');

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
      this.nextTimeStr = moment(nextDarkTime?.date).format(FORMAT_TIME) || '';
      this.nextSunStr = 'Sunset - ' + moment(sunset?.date).format(FORMAT_TIME_AND_DATE) || '';

    } else {
      // calculate time to dawn
      duration = moment.duration(moment().diff(moment(nextDawnTime?.date)));
      this.nextTimeStr = moment(nextDawnTime?.date).format(FORMAT_TIME) || '';
      this.nextSunStr = 'Sunrise - ' +  moment(sunrise?.date).format(FORMAT_TIME_AND_DATE) || '';
    }

    this.timeToChangeStr = durationToString(duration);
  }



  ngOnDestroy() {
    clearInterval(this.itvlId);
  }

}
