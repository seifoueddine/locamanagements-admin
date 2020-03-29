import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { SlugsComponent } from './slugs.component';
import { SlugsRoutingModule } from './slugs-routing.module';




@NgModule({
  imports: [
    CommonModule,
    SlugsRoutingModule,
    MatGridListModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  declarations: [SlugsComponent],
})
export class SlugsModule {}
