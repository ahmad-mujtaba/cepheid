import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MoonPhase } from 'astronomy-engine';

@Component({
  selector: 'app-moon-phase',
  templateUrl: './moon-phase.component.html',
  styleUrl: './moon-phase.component.scss'
})
export class MoonPhaseComponent implements OnInit, OnDestroy {
  /** Moon phase angle in degrees (0-360). 0=New, 90=First Quarter, 180=Full, 270=Third Quarter.
   *  If not provided, auto-computes from the current date. */
  @Input() phaseAngle: number = -1;

  private itvlId: any;

  ngOnInit() {
    if (this.phaseAngle < 0) {
      this.phaseAngle = MoonPhase(new Date());
      this.itvlId = setInterval(() => {
        this.phaseAngle = MoonPhase(new Date());
      }, 60000);
    }
  }

  /** Negative delay freezes the paused animation at the correct frame.
   *  The 20s animation with `reverse` maps linearly: 0°→0s, 360°→20s. */
  get animationDelay(): number {
    return -(this.phaseAngle / 360) * 20;
  }

  ngOnDestroy() {
    if (this.itvlId) clearInterval(this.itvlId);
  }
}
