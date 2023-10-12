import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenericPortfolioPageRoutingModule } from './generic-portfolio-routing.module';

import { GenericPortfolioPage } from './generic-portfolio.page';
import { MutualFundCardComponent } from 'src/app/components/mutual-fund-card/mutual-fund-card.component';
import { LifeInsuranceCardComponent } from 'src/app/components/life-insurance-card/life-insurance-card.component';
import { MediclaimCardComponent } from 'src/app/components/mediclaim-card/mediclaim-card.component';
import { VehicleInsuranceCardComponent } from 'src/app/components/vehicle-insurance-card/vehicle-insurance-card.component';
import { EquitiesCardComponent } from 'src/app/components/equities-card/equities-card.component';
import { SharedModuleModule } from 'src/app/modules/shared-module.module';
import { GenericePortfolioTableComponent } from 'src/app/components/generice-portfolio-table/generice-portfolio-table.component';
import { CorporateInsuranceCardComponent } from 'src/app/components/corporate-insurance-card/corporate-insurance-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModuleModule,
    GenericPortfolioPageRoutingModule
  ],
  declarations: [
    GenericPortfolioPage,
    MutualFundCardComponent,
    LifeInsuranceCardComponent,
    MediclaimCardComponent,
    VehicleInsuranceCardComponent,
    EquitiesCardComponent,
    GenericePortfolioTableComponent,
    VehicleInsuranceCardComponent,
    CorporateInsuranceCardComponent
  ]
})
export class GenericPortfolioPageModule { }
