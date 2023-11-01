import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiderSumAssuredPageRoutingModule } from './rider-sum-assured-routing.module';

import { SharedModuleModule } from 'src/app/modules/shared-module.module';
import { RiderSumAssuredPage } from './rider-sum-assured.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiderSumAssuredPageRoutingModule,
    SharedModuleModule
  ],
  declarations: [RiderSumAssuredPage]
})
export class RiderSumAssuredPageModule { }
