import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortfolioInvestmentsPageRoutingModule } from './portfolio-investments-routing.module';

import { PortfolioInvestmentsPage } from './portfolio-investments.page';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortfolioInvestmentsPageRoutingModule
  ],
  declarations: [PortfolioInvestmentsPage, HeaderComponent]
})
export class PortfolioInvestmentsPageModule { }
