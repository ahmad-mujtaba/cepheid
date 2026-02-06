import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { MoonInfoComponent } from './moon-info/moon-info.component';
import { NightComponent } from './night-info/night.component';
import { GeolocationService } from './services/geolocation.service';
import { DsosComponent } from "./dsos/dsos.component";

@Component({
  selector: 'app-root',
  imports: [DsosComponent, MoonInfoComponent, HeaderComponent, NightComponent, MaterialModule],
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
