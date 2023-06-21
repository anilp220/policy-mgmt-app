import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenericPortfoliosPage } from './generic-portfolios.page';

const routes: Routes = [
  {
    path: '',
    component: GenericPortfoliosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenericPortfoliosPageRoutingModule {}
