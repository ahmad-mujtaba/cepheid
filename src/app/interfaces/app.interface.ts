import { AstroTime } from "astronomy-engine";
import { CelestialObject } from "../types/celestialobject.type";

export interface VisibilityResult {
    altitude: number;   // Degrees above horizon
    azimuth: number;    // Degrees from north
    isVisible: boolean; // Rough visibility check
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface EquatorialCoordinates {
    ra: number;  // Right Ascension in hours
    dec: number; // Declination in degrees
}

export interface RawEquatorialCoordinates {
    ra: string;  
    dec: string; 
}

export interface RiseSetTimes {
    riseTime: Date | null;
    setTime: Date | null;
}

export interface DSO extends CelestialObject {
    id: string,
    supertype: DSO_TYPE,
    size: number,
    visibility: DSOVisibility
}

export enum DSO_TYPE {
    CLUSTER = 'cluster',
    NEBULA = 'nebula',
    GALAXY = 'galaxy',
    OTHER = 'other'
}

export interface DSOVisibility {
    riseTime: AstroTime | null,
    setTime: AstroTime | null,
    visibleDuration: number,
    visibleTonight: boolean,

}
