import { Injectable } from '@angular/core';
import { celestialObjects } from '../../dataset';
import { caldwellObjects } from '../../caldwell';
import { astrophotoObjects } from '../../astrophoto';
import { CelestialObject } from '../types/celestialobject.type';
import { Coordinates, DSO, DSO_TYPE, DSOVisibility } from '../interfaces/app.interface';
import { DefineStar, Body, SearchAltitude, SearchHourAngle, Observer, AstroTime, Horizon, HorizontalCoordinates } from 'astronomy-engine';
import { raToHours, decToDegrees } from '../util/utility';
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
      this.isDaylight = this.nextDarkTime.tt < this.nextDawnTime.tt;
    }

    this._objects = [...celestialObjects, ...caldwellObjects, ...astrophotoObjects];
    this.process();
  }

  private process() {
    this.dsos = [];
    for (let obj of this._objects) {
      let visibility = this.getVisibilityDuration(obj);
      let dso: DSO = {
        id: '_id_' + obj.catalogue.replace(/\s+/g, '_'),
        supertype: this.getSuperType(obj),
        size: this.calculateSize(obj),
        visibility: visibility,
        ...obj,
      }
      this.dsos.push(dso);
    }
  }

  getVisibilityDuration(o: CelestialObject): DSOVisibility {
    let raHours = raToHours(o.ra);
    let decDeg = decToDegrees(o.dec);

    try {
      DefineStar(Body.Star1, raHours, decDeg, 9999);

      // Compute transit (meridian crossing) — next from now
      let transitTime: AstroTime | null = null;
      let transitAltitude = 0;
      try {
        const transit = SearchHourAngle(Body.Star1, this.observer!, 0, new Date());
        transitTime = transit.time;
        transitAltitude = Math.round(transit.hor.altitude * 10) / 10;
      } catch (_) {}

      if (!this.nextDarkTime || !this.nextDawnTime) {
        return { setTime: null, riseTime: null, visibleDuration: 0, visibleTonight: false, transitTime, transitAltitude, visibleFrom: null, visibleUntil: null };
      }

      // Determine dark window
      let darkStart: AstroTime;
      let darkEnd: AstroTime;

      if (this.isDaylight) {
        // It's daytime: dark window is nextDarkTime → nextDawnTime
        darkStart = this.nextDarkTime;
        darkEnd = this.nextDawnTime;
      } else {
        // It's already dark: dark window is now → nextDawnTime
        darkStart = new AstroTime(new Date());
        darkEnd = this.nextDawnTime;
      }

      const darkDurationHours = (darkEnd.tt - darkStart.tt) * 24;

      // Check if object is above horizon at dark window start
      const horizonAtStart: HorizontalCoordinates = Horizon(darkStart, this.observer!, raHours, decDeg, 'normal');
      const isUpAtStart = horizonAtStart.altitude > 0;

      // Search for rise and set within the dark window
      const riseTime = SearchAltitude(Body.Star1, this.observer!, 1, darkStart.date, darkDurationHours / 24, 0);
      const setTime = SearchAltitude(Body.Star1, this.observer!, -1, darkStart.date, darkDurationHours / 24, 0);

      let totalMinutes = 0;
      let visibleTonight = false;
      let visibleFrom: Date | null = null;
      let visibleUntil: Date | null = null;

      if (isUpAtStart) {
        if (setTime) {
          // Object is up at start, then sets
          const firstSegmentMs = setTime.date.getTime() - darkStart.date.getTime();
          totalMinutes += firstSegmentMs / 60000;
          visibleFrom = darkStart.date;
          visibleUntil = setTime.date;

          if (riseTime && riseTime.tt > setTime.tt) {
            // Case A: rises again after setting — add second segment to dawn
            const secondSegmentMs = darkEnd.date.getTime() - riseTime.date.getTime();
            totalMinutes += secondSegmentMs / 60000;
            visibleUntil = darkEnd.date;
            visibleTonight = true;
          }
          // Case B: sets and doesn't rise again
          visibleTonight = true;
        } else {
          // Case C: up all night (circumpolar or never sets during dark window)
          totalMinutes = (darkEnd.date.getTime() - darkStart.date.getTime()) / 60000;
          visibleFrom = darkStart.date;
          visibleUntil = darkEnd.date;
          visibleTonight = true;
        }
      } else {
        // Object is below horizon at dark start
        if (riseTime) {
          visibleFrom = riseTime.date;
          if (setTime && setTime.tt > riseTime.tt) {
            // Case D: rises then sets
            totalMinutes = (setTime.date.getTime() - riseTime.date.getTime()) / 60000;
            visibleUntil = setTime.date;
          } else {
            // Case E: rises, up through dawn
            totalMinutes = (darkEnd.date.getTime() - riseTime.date.getTime()) / 60000;
            visibleUntil = darkEnd.date;
          }
          visibleTonight = true;
        }
        // Case F: never rises — totalMinutes stays 0, visibleTonight stays false
      }

      const visibleHours = Math.round((totalMinutes / 60) * 100) / 100;

      return {
        setTime,
        riseTime,
        visibleDuration: Math.max(0, visibleHours),
        visibleTonight,
        transitTime,
        transitAltitude,
        visibleFrom,
        visibleUntil,
      };
    } catch (ex) {
      console.error('error while processing ' + o.common_name);
      console.error(ex);
    }
    return {
      setTime: null,
      riseTime: null,
      visibleDuration: 0,
      visibleTonight: false,
      transitTime: null,
      transitAltitude: 0,
      visibleFrom: null,
      visibleUntil: null,
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
    return this.dsos.filter((dso) => {
      return filter[dso.supertype] && dso.visibility.visibleDuration >= 5 / 60;
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
