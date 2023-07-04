import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPolicyPageRoutingModule } from './view-policy-routing.module';

import { ViewPolicyPage } from './view-policy.page';
import { NestedTableComponent } from 'src/app/components/nested-table/nested-table.component';
import { SharedModuleModule } from 'src/app/modules/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPolicyPageRoutingModule,
    SharedModuleModule,
  ],
  declarations: [ViewPolicyPage, NestedTableComponent],
})
export class ViewPolicyPageModule { }
