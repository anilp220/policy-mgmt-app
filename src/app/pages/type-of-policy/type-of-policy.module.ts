import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeOfPolicyPageRoutingModule } from './type-of-policy-routing.module';

import { TypeOfPolicyPage } from './type-of-policy.page';
import { SharedModuleModule } from 'src/app/modules/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModuleModule,
    TypeOfPolicyPageRoutingModule
  ],
  declarations: [TypeOfPolicyPage]
})
export class TypeOfPolicyPageModule { }
