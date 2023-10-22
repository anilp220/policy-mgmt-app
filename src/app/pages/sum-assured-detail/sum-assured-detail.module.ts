import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SumAssuredDetailPageRoutingModule } from './sum-assured-detail-routing.module';

import { SumAssuredDetailPage } from './sum-assured-detail.page';
import { SharedModuleModule } from 'src/app/modules/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SumAssuredDetailPageRoutingModule,
    SharedModuleModule
  ],
  declarations: [SumAssuredDetailPage]
})
export class SumAssuredDetailPageModule { }
