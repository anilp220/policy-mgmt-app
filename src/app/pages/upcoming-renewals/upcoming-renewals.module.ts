import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingRenewalsPageRoutingModule } from './upcoming-renewals-routing.module';

import { UpcomingRenewalsPage } from './upcoming-renewals.page';
import { SharedModuleModule } from 'src/app/modules/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingRenewalsPageRoutingModule,
    SharedModuleModule
  ],
  declarations: [UpcomingRenewalsPage]
})
export class UpcomingRenewalsPageModule {}
