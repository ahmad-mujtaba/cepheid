import { Duration } from "moment";

// Convert RA (HHh MMm SSs) to decimal hours (0-24)
export function raToHours(ra: string): number {
    const parts = ra.split(/h |m |s/).map(parseFloat);
    const hours = parts[0] + parts[1] / 60 + parts[2] / 3600;
    return hours;
}

// Convert Dec (±DD° MM' SS") to decimal degrees
export function decToDegrees(dec: string): number {
    const parts = dec.split(/° |' |"/).map(parseFloat);
    const sign = parts[0] < 0 ? -1 : 1;
    return sign * (Math.abs(parts[0]) + parts[1] / 60 + parts[2] / 3600);
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
      str.push(`${Math.abs(duration.hours())} h`);
    }

    if (Math.abs(duration.minutes()) > 0) {
      str.push(`${Math.abs(duration.minutes())} m`);
    }
    return str.join(separator);
  }
