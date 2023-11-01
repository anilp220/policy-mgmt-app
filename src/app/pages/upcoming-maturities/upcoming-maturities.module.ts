import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingMaturitiesPageRoutingModule } from './upcoming-maturities-routing.module';

import { UpcomingMaturitiesPage } from './upcoming-maturities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingMaturitiesPageRoutingModule
  ],
  declarations: [UpcomingMaturitiesPage]
})
export class UpcomingMaturitiesPageModule {}
