import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingRenewalsPageRoutingModule } from './upcoming-renewals-routing.module';

import { UpcomingRenewalsPage } from './upcoming-renewals.page';
import { SharedModuleModule } from 'src/app/modules/shared-module.module';
import {NgChartsModule} from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingRenewalsPageRoutingModule,
    NgChartsModule,
    SharedModuleModule
  ],
  declarations: [UpcomingRenewalsPage]
})
export class UpcomingRenewalsPageModule {}
