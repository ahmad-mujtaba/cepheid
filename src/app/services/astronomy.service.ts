import { Injectable } from '@angular/core';
import { celestialObjects } from '../../dataset';
import { caldwellObjects } from '../../caldwell';
import { CelestialObject } from '../types/celestialobject.type';
import { Coordinates, DSO, DSO_TYPE, DSOVisibility } from '../interfaces/app.interface';
import { DefineStar, Body, SearchAltitude, SearchHourAngle, Observer, AstroTime } from 'astronomy-engine';
import moment, { Duration, now } from 'moment';
import { raToDegrees, decToDegrees } from '../util/utility';
import { GeolocationService } from './geolocation.service';
import { DARK_ALTITUDE } from './constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AstronomyService {
  _objects: Array<CelestialObject>;
  observerLocation: Coordinates | undefined;
  observer: Observer | undefined;
  nextDarkTime: AstroTime | null;
  nextDawnTime: AstroTime | null;
  isDaylight: boolean = false;
  dsos: Array<DSO> = [];

  constructor(private geolocationService: GeolocationService) {
    this.observerLocation = this.geolocationService.getGeolocation();

    this.observer = new Observer(this.observerLocation!.latitude, this.observerLocation!.longitude, 0);
    const now = new Date();

    this.nextDarkTime = SearchAltitude(Body.Sun, this.observer, -1, now, 365, DARK_ALTITUDE);
    this.nextDawnTime = SearchAltitude(Body.Sun, this.observer, 1, now, 365, DARK_ALTITUDE);

    if (this.nextDarkTime && this.nextDawnTime) {
      this.isDaylight = this.nextDarkTime?.tt < this.nextDawnTime?.tt;
    }

    this._objects = [...celestialObjects, ...caldwellObjects];
    this.process();
  }

  private process() {
    this.dsos = [];
    for (let obj of this._objects) {
      let visibility = this.getVisibilityDuration(obj);
      let dso: DSO = {
        id: '_id_' + (1000 + Math.round(Math.random() * 100000000)),
        supertype: this.getSuperType(obj),
        size: this.calculateSize(obj),
        visibility: visibility,
        ...obj,
      }
      this.dsos.push(dso);
    }
  }

  getVisibilityDuration(o: CelestialObject): DSOVisibility {
    let d = 0;
    let raDegrees = raToDegrees(o.ra);
    let decDegrees = decToDegrees(o.dec);
    
    const now = new Date();
    try {
      DefineStar(Body.Star1, raDegrees, decDegrees, 9999);

      const riseTime = SearchAltitude(Body.Star1, this.observer!, 1, now, 365, 0);
      const setTime = SearchAltitude(Body.Star1, this.observer!, -1, now, 365, 0);
      // const peakTime = SearchHourAngle(Body.Star1, this.observer!, 0, now);

      if (this.nextDarkTime && this.nextDawnTime) {
        if (riseTime) {
          if (riseTime?.tt > this.nextDarkTime?.tt && riseTime?.tt < this.nextDawnTime.tt) {
            // object rises after dark but before dawn
            // duration = rise to dawn
            d = Math.abs(moment(riseTime.toString()).diff(moment(this.nextDawnTime.toString())));
          }
        } else {
          console.error(`[debug] ${o.catalogue} has no riseTime`);
        }

        if (setTime) {
          if (setTime?.tt > this.nextDarkTime?.tt && setTime?.tt < this.nextDawnTime.tt) {
            // object sets before dawn but after dark
            // duration = rise to dawn
            d = Math.abs(moment(setTime.toString()).diff(moment(this.nextDarkTime.toString())));
          }
        } else {
          console.error(`[debug] ${o.catalogue} has no setTime`);
        }

        
      } else {
        console.error('[debug] no nextDarkTime or nextDawnTime', this.nextDawnTime, this.nextDarkTime);
      }

      //d = setTime && riseTime ? moment(setTime!.toString()).diff(moment(riseTime!.toString())) : 0;
      

      return  {
        setTime,
        riseTime,
        visibleDuration: Math.round((d / 3.6e+6) * 100) / 100,
        visibleTonight: true,
      };
    } catch (ex) {
      console.error('error while processing ' + o.common_name);
      console.error(ex);
    }
    return  {
      setTime: null,
      riseTime: null,
      visibleDuration: 0,
      visibleTonight: true,
    };
    
  }
  calculateSize(obj: CelestialObject): number {
    let d = obj.dimensions.split('x');

    const circleArea = (r: number) => Math.PI * (r) * (r);
    if (d.length === 1) {
      // its a single value indicating radius
      if (d[0].indexOf('″') > -1) {
        // seconds
        return circleArea(parseFloat(d[0].replaceAll('″', '')) / 60);
      } else {
        // minutes
        return circleArea(parseFloat(d[0].replaceAll('′', '')));
      }
    } else {
      let w = d[0];
      let h = d[1];

      if (w.indexOf('″') > -1) {
        // seconds
        return (parseFloat(w.replaceAll('″', '')) / 60) * (parseFloat(h.replaceAll('″', '')) / 60);
      } else {
        // minutes
        return (parseFloat(w.replaceAll('′', ''))) * (parseFloat(h.replaceAll('′', '')));
      }
    }
  }
  getSuperType(obj: CelestialObject): DSO_TYPE {
    if (obj.type.toLowerCase().indexOf('nebula') > -1) {
      return DSO_TYPE.NEBULA;
    }
    if (obj.type.toLowerCase().indexOf('galaxy') > -1) {
      return DSO_TYPE.GALAXY;
    }
    if (obj.type.toLowerCase().indexOf('cluster') > -1) {
      return DSO_TYPE.CLUSTER;
    }
    return DSO_TYPE.OTHER;
  }

  getDsos(filter: any) {
    return this.dsos.filter((dso, idx, dsos) => {
      return filter[dso.supertype];
    });
  }

  sortByMagnitude() {
    this.dsos = this.dsos.sort((a, b) => {
      if (a.magnitude != b.magnitude) {
         return a.magnitude - b.magnitude
        } else {
          return b.visibility.visibleDuration - a.visibility.visibleDuration
        }
    });
  }

  sortBySize() {
    this.dsos = this.dsos.sort((a, b) => b.size - a.size);
  }

  getTypes() {
    const types = new Set<string>();
    for (let dso of this.dsos) {
      types.add(dso.supertype);
    }
    return types;
  }
}

