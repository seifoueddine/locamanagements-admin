import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterTabs } from './router-tab/router-tabs.directive';
import { RouterTab } from './router-tab/router-tab.directive';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [CommonModule, RouterModule, FlexLayoutModule,MatChipsModule],
  declarations: [PageNotFoundComponent, RouterTabs, RouterTab],
  exports: [
    CommonModule,
    FlexLayoutModule,
    PageNotFoundComponent,
    RouterTabs,
    RouterTab,
    MatChipsModule
  ]
})
export class SharedModule {}
