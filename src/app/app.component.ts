import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { celestialObjects } from '../dataset';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { MoonInfoComponent } from './moon-info/moon-info.component';
import { NightComponent } from './night-info/night.component';
import { GeolocationService } from './services/geolocation.service';
import { calculateRiseSetTimes, calculateVisibility, decToDegrees, raToDegrees } from './util/utility';
import { DsosComponent } from "./dsos/dsos.component";
import { Coordinates, RawEquatorialCoordinates } from './interfaces/app.interface';
import { Body, DefineStar, Equator, Observer, SearchAltitude, SearchHourAngle, SearchRiseSet } from 'astronomy-engine';

@Component({
  selector: 'app-root',
  imports: [DsosComponent, MoonInfoComponent, HeaderComponent, NightComponent, MaterialModule, DsosComponent],
  //providers: [GeolocationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'Astrolabe';

  constructor(private geolocationService: GeolocationService) {


  }


  ngOnInit() {

    
  }
}

