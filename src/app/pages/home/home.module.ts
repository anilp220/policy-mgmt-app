import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
// import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { HomePage } from './home.page';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoundProgressModule,
    IonicModule,
    HomePageRoutingModule,
    // Ng2GoogleChartsModule
  ],
  declarations: [HomePage, HeaderComponent]
})
export class HomePageModule { }
