// material.module.ts
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule} from '@angular/material/checkbox';
// ... other material modules

@NgModule({
  exports: [
    MatIconModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }