import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
// import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { HomePage } from './home.page';
import { SharedModuleModule } from 'src/app/modules/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoundProgressModule,
    IonicModule,
    HomePageRoutingModule,
    // Ng2GoogleChartsModule
    SharedModuleModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
