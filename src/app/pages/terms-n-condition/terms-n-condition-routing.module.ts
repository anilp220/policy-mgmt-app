import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsNConditionPage } from './terms-n-condition.page';

const routes: Routes = [
  {
    path: '',
    component: TermsNConditionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsNConditionPageRoutingModule {}
