import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpcomingRenewalsPage } from './upcoming-renewals.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingRenewalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingRenewalsPageRoutingModule {}
