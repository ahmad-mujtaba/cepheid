import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AstronomyService } from '../services/astronomy.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { DSO } from '../interfaces/app.interface';
import { PrettyTimePipe } from "../pretty-time.pipe";

@Component({
  selector: 'app-dsos',
  templateUrl: './dsos.component.html',
  styleUrl: './dsos.component.scss',
  imports: [FormsModule, ReactiveFormsModule, JsonPipe, MatCheckboxModule, PrettyTimePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class DsosComponent implements OnInit {


  change() {
    this.render();
  }

  types:Set<string> = new Set();
  dsos: Array<DSO> = [];
  private readonly _formBuilder = inject(FormBuilder);

  selectedTypes = this._formBuilder.group({
    cluster: true,
    galaxy: true,
    nebula: true,
    other: true,
  });

  constructor(private astronomyService: AstronomyService) {
  }

  ngOnInit() {

    this.render();

    
    

  }

  render() {    
    this.astronomyService.sortByMagnitude();
    this.dsos = this.astronomyService.getDsos(this.selectedTypes.value);
    this.types = this.astronomyService.getTypes();

    console.log('[debug] dsos', this.dsos);

  }

}
