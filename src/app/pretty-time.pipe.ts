import { Pipe, PipeTransform } from '@angular/core';
import { HourAngle } from 'astronomy-engine';

@Pipe({
  name: 'prettyTime'
})
export class PrettyTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let s = '';
    let h = '';
    let m = '';
    let hours = Math.floor(value);
    let minutes = value - hours;

    if (value < 1) {
      return Math.round(minutes * 60) + 'm';
    }
    return hours+'h ' + Math.round(minutes * 60) + 'm';
  }

}
