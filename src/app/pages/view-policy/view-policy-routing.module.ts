import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPolicyPage } from './view-policy.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPolicyPageRoutingModule {}
