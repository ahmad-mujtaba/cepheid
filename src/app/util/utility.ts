import { Duration } from "moment";
import { julian, sidereal, sexagesimal, rise } from 'astronomia';
import { CelestialObject } from "../types/celestialobject.type";
import { Coordinates, EquatorialCoordinates, RawEquatorialCoordinates, RiseSetTimes, VisibilityResult } from "../interfaces/app.interface";
import { SiderealTime } from "astronomy-engine";

// Convert RA (HHh MMm SSs) to decimal degrees
export function raToDegrees(ra: string): number {
    const parts = ra.split(/h |m |s/).map(parseFloat);
    const hours = parts[0] + parts[1] / 60 + parts[2] / 3600;
    return hours; // 1 hour = 15 degrees
}

// Convert Dec (±DD° MM' SS") to decimal degrees
export function decToDegrees(dec: string): number {
    const parts = dec.split(/° |' |"/).map(parseFloat);
    const sign = parts[0] < 0 ? -1 : 1;
    return sign * (Math.abs(parts[0]) + parts[1] / 60 + parts[2] / 3600);
}

// Convert degrees to radians
export function degToRad(degrees: number): number {
    return degrees * Math.PI / 180;
}


  
  export function calculateVisibility(
    object: CelestialObject,
    observerLat: number,
    observerLon: number,
    date: Date
  ): VisibilityResult {
    // Convert inputs
    const raDeg = raToDegrees(object.ra);
    const decDeg = decToDegrees(object.dec);
    const latRad = degToRad(observerLat);
    const decRad = degToRad(decDeg);
  
    // Calculate Local Sidereal Time (LST)
    const lst = calculateLST(date, observerLon);
    
    // Calculate Hour Angle
    const haDeg = (lst - raDeg + 360) % 360;
    const haRad = degToRad(haDeg);
  
    // Calculate Altitude
    const sinAlt = Math.sin(decRad) * Math.sin(latRad) + 
                  Math.cos(decRad) * Math.cos(latRad) * Math.cos(haRad);
    const altitude = Math.asin(sinAlt) * 180 / Math.PI;
  
    // Calculate Azimuth
    const tanAzNum = -Math.sin(haRad);
    const tanAzDen = Math.tan(decRad) * Math.cos(latRad) - 
                    Math.sin(latRad) * Math.cos(haRad);
    let azimuth = Math.atan2(tanAzNum, tanAzDen) * 180 / Math.PI;
    azimuth = (azimuth + 360) % 360; // Normalize to 0-360
  
    return {
      altitude: Number(altitude.toFixed(2)),
      azimuth: Number(azimuth.toFixed(2)),
      isVisible: altitude > 1 // Minimum 20° altitude
    };
  }
  
  export function calculateLST(date: Date, longitude: number): number {

   // SiderealTime(date);
    
    // Days since J2000 epoch (2000-01-01 12:00:00 UTC)
    const j2000 = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
    const daysSinceJ2000 = (date.getTime() - j2000.getTime()) / 86400000;
    
    // Local Sidereal Time formula
    const lstHours = (18.697374558 + 24.06570982441908 * daysSinceJ2000) % 24;
    const lstDegrees = lstHours * 15 + longitude;
    
    return (lstDegrees + 360) % 360;
  }

export const durationToString: any = (duration: Duration, separator: string = ', ') => {

    let str = [];
    let suffixS = (x: number) => x === 1 ? '' : 's';

    if (Math.abs(duration.months()) > 0) {
      str.push(`${Math.abs(duration.months())} month${suffixS(Math.abs(duration.months()))}`);
    }

    if (Math.abs(duration.days()) > 0) {
      str.push(`${Math.abs(duration.days())} day${suffixS(Math.abs(duration.days()))}`);
    }

    if (Math.abs(duration.hours()) > 0) {
      str.push(`${Math.abs(duration.hours())} hour${suffixS(Math.abs(duration.hours()))}`);
    }

    if (Math.abs(duration.minutes()) > 0) {
      str.push(`${Math.abs(duration.minutes())} minute${suffixS(Math.abs(duration.minutes()))}`);
    }
    return str.join(separator);
  }


 
  
  export function calculateRiseSetTimes(
    date: Date,
    coords: Coordinates,
    _objectCoords: RawEquatorialCoordinates
  ): RiseSetTimes {
    const objectCoords: EquatorialCoordinates = {
      ra: raToDegrees(_objectCoords.ra), 
      dec: decToDegrees(_objectCoords.dec),
    };

    const jd = julian.CalendarToJD(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const gst = sidereal.apparent0UT(jd); // Greenwich Sidereal Time at 0h UT
    
    const LST = calculateLST(date, coords.longitude); //(gst + coords.longitude / 15) % 24; // Local Sidereal Time in hours
    
    const H = (LST - objectCoords.ra) * 15; // Hour angle in degrees
  
    const latRad = (coords.latitude * Math.PI) / 180;
    const decRad = (objectCoords.dec * Math.PI) / 180;
    const HA = Math.acos(-Math.tan(latRad) * Math.tan(decRad)) * (180 / Math.PI);
  
    if (isNaN(HA)) {
      return { riseTime: null, setTime: null }; // Object never rises or sets
    }
  
    const riseHA = (H - HA) / 15; // Convert to hours
    const setHA = (H + HA) / 15;  // Convert to hours
  
    const riseTime = new Date(date);
    riseTime.setUTCHours(riseHA, 0, 0, 0);
  
    const setTime = new Date(date);
    setTime.setUTCHours(setHA, 0, 0, 0);
  
    return { riseTime, setTime };
  }
