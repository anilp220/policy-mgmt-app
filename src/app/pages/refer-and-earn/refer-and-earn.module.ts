import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferAndEarnPageRoutingModule } from './refer-and-earn-routing.module';

import { ReferAndEarnPage } from './refer-and-earn.page';
import { SharedModuleModule } from 'src/app/modules/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferAndEarnPageRoutingModule,
    SharedModuleModule
  ],
  declarations: [ReferAndEarnPage]
})
export class ReferAndEarnPageModule {}
