import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiderSumAssuredPage } from './rider-sum-assured.page';


const routes: Routes = [
  {
    path: '',
    component: RiderSumAssuredPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiderSumAssuredPageRoutingModule { }
