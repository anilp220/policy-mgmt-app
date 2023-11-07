import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsNConditionPageRoutingModule } from './terms-n-condition-routing.module';

import { TermsNConditionPage } from './terms-n-condition.page';
import { SharedModuleModule } from 'src/app/modules/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsNConditionPageRoutingModule,
    SharedModuleModule
  ],
  declarations: [TermsNConditionPage]
})
export class TermsNConditionPageModule {}
