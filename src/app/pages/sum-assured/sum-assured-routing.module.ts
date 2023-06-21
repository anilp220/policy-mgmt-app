import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SumAssuredPage } from './sum-assured.page';

const routes: Routes = [
  {
    path: '',
    component: SumAssuredPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SumAssuredPageRoutingModule {}
