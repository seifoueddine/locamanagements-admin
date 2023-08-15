import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';


import { MatGridRoutingModule } from './mat-grid-routing.module';
import { GridComponent } from './grid/grid.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatGridRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [GridComponent]
})
export class MatGridModule {}
