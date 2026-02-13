import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AstronomyService } from '../services/astronomy.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DSO } from '../interfaces/app.interface';
import { PrettyTimePipe } from "../pretty-time.pipe";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dsos',
  templateUrl: './dsos.component.html',
  styleUrl: './dsos.component.scss',
  imports: [FormsModule, ReactiveFormsModule, PrettyTimePipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DsosComponent implements OnInit {

  private readonly _cdr = inject(ChangeDetectorRef);

  change() {
    this.render();
    this._cdr.markForCheck();
  }

  types:Set<string> = new Set();
  dsos: Array<DSO> = [];
  searchQuery: string = '';
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

  onSearch(query: string) {
    this.searchQuery = query;
    this.render();
    this._cdr.markForCheck();
  }

  clearSearch() {
    this.searchQuery = '';
    this.render();
    this._cdr.markForCheck();
  }

  render() {
    this.astronomyService.sortByMagnitude();
    if (this.searchQuery) {
      this.dsos = this.astronomyService.searchDsos(this.searchQuery, this.selectedTypes.value);
    } else {
      this.dsos = this.astronomyService.getDsos(this.selectedTypes.value);
    }
    this.types = this.astronomyService.getTypes();
  }

}
