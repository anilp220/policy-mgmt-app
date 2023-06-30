import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenericPortfoliosPageRoutingModule } from './generic-portfolios-routing.module';

import { GenericPortfoliosPage } from './generic-portfolios.page';

import { GenericPortfolioCardComponent } from '../../components/generic-portfolio-card/generic-portfolio-card.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenericPortfoliosPageRoutingModule
  ],
  declarations: [GenericPortfoliosPage, GenericPortfolioCardComponent, HeaderComponent]
})
export class GenericPortfoliosPageModule { }
