import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { MoonInfoComponent } from './moon-info/moon-info.component';
import { NightComponent } from './night-info/night.component';
import { PlanetsComponent } from './planets/planets.component';
import { EventsComponent } from './events/events.component';
import { GeolocationService } from './services/geolocation.service';
import { DsosComponent } from "./dsos/dsos.component";
import { MoonPhaseComponent } from './moon-phase/moon-phase.component';

@Component({
  selector: 'app-root',
  imports: [DsosComponent, MoonInfoComponent, HeaderComponent, NightComponent, PlanetsComponent, EventsComponent, MaterialModule, MoonPhaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Astrolabe';

  constructor(private geolocationService: GeolocationService) {
  }

  ngOnInit() {
    this.geolocationService.setGeolocation();
  }
}
