import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortfolioInvestmentsPageRoutingModule } from './portfolio-investments-routing.module';

import { PortfolioInvestmentsPage } from './portfolio-investments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortfolioInvestmentsPageRoutingModule
  ],
  declarations: [PortfolioInvestmentsPage]
})
export class PortfolioInvestmentsPageModule {}
