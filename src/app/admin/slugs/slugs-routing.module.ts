import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlugsComponent } from './slugs.component';



const routes: Routes = [
  {
    path: '',
    component: SlugsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlugsRoutingModule { }
