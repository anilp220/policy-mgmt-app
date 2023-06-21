import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpcomingPaymentsPage } from './upcoming-payments.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingPaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingPaymentsPageRoutingModule {}
