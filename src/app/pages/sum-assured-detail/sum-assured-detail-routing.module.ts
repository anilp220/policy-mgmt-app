import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SumAssuredDetailPage } from './sum-assured-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SumAssuredDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SumAssuredDetailPageRoutingModule {}
