import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenericPortfolioPage } from './generic-portfolio.page';

const routes: Routes = [
  {
    path: '',
    component: GenericPortfolioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenericPortfolioPageRoutingModule {}
