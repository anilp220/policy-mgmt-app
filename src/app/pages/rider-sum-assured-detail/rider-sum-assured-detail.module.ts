import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiderSumAssuredDetailPageRoutingModule } from './rider-sum-assured-detail-routing.module';

import { RiderSumAssuredDetailPage } from './rider-sum-assured-detail.page';
import { SharedModuleModule } from 'src/app/modules/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiderSumAssuredDetailPageRoutingModule,
    SharedModuleModule
  ],
  declarations: [RiderSumAssuredDetailPage]
})
export class RiderSumAssuredDetailPageModule { }
