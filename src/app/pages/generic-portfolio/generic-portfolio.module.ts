import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenericPortfolioPageRoutingModule } from './generic-portfolio-routing.module';

import { GenericPortfolioPage } from './generic-portfolio.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MutualFundCardComponent } from 'src/app/components/mutual-fund-card/mutual-fund-card.component';
import { LifeInsuranceCardComponent } from 'src/app/components/life-insurance-card/life-insurance-card.component';
import { MediclaimCardComponent } from 'src/app/components/mediclaim-card/mediclaim-card.component';
import { VehicleInsuranceCardComponent } from 'src/app/components/vehicle-insurance-card/vehicle-insurance-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenericPortfolioPageRoutingModule
  ],
  declarations: [
    GenericPortfolioPage,
    HeaderComponent,
    MutualFundCardComponent,
    LifeInsuranceCardComponent,
    MediclaimCardComponent,
    VehicleInsuranceCardComponent
  ]
})
export class GenericPortfolioPageModule { }
