import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPagePageRoutingModule } from './detail-page-routing.module';

import { DetailPagePage } from './detail-page.page';
import { SharedModuleModule } from 'src/app/modules/shared-module.module';
import { PopupModalComponent } from 'src/app/components/popup-modal/popup-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPagePageRoutingModule,
    SharedModuleModule
  ],
  declarations: [DetailPagePage, PopupModalComponent]
})
export class DetailPagePageModule { }
