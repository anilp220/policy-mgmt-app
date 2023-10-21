import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SumAssuredPageRoutingModule } from './sum-assured-routing.module';

import { SumAssuredPage } from './sum-assured.page';
import { SharedModuleModule } from 'src/app/modules/shared-module.module';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SumAssuredPageRoutingModule,
    SharedModuleModule,
    HighchartsChartModule
  ],
  declarations: [SumAssuredPage]
})
export class SumAssuredPageModule { }
