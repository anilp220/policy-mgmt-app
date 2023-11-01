import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpcomingMaturitiesPage } from './upcoming-maturities.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingMaturitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingMaturitiesPageRoutingModule {}
