// astronomia.d.ts

declare module 'astronomia' {
    export namespace julian {
      function CalendarToJD(year: number, month: number, day: number): number;
    }
  
    export namespace sidereal {
      function apparent0UT(jd: number): number;
    }
  
    export namespace sexagesimal {
      function hourAngleToDeg(angle: string): number;
      function angleToDeg(angle: string): number;
    }
  
    export namespace rise {
      interface RiseSet {
        rise: number;
        set: number;
        aboveHorizon: boolean;
      }
  
      function time(
        jd: number,
        ra: number,
        dec: number,
        lat: number,
        lon: number,
        refraction?: boolean
      ): RiseSet;
    }
  }
  