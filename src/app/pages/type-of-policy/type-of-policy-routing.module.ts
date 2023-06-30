import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeOfPolicyPage } from './type-of-policy.page';

const routes: Routes = [
  {
    path: '',
    component: TypeOfPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeOfPolicyPageRoutingModule {}
