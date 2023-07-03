import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyDetailPageRoutingModule } from './policy-detail-routing.module';

import { PolicyDetailPage } from './policy-detail.page';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicyDetailPageRoutingModule
  ],
  declarations: [PolicyDetailPage, HeaderComponent]
})
export class PolicyDetailPageModule { }
