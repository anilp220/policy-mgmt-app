import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiderSumAssuredDetailPage } from './rider-sum-assured-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RiderSumAssuredDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiderSumAssuredDetailPageRoutingModule {}
