import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenericPortfoliosPageRoutingModule } from './generic-portfolios-routing.module';

import { GenericPortfoliosPage } from './generic-portfolios.page';

import { GenericPortfolioCardComponent } from '../../components/generic-portfolio-card/generic-portfolio-card.component';
import { SharedModuleModule } from 'src/app/modules/shared-module.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenericPortfoliosPageRoutingModule,
    SharedModuleModule
  ],
  declarations: [GenericPortfoliosPage, GenericPortfolioCardComponent]
})
export class GenericPortfoliosPageModule { }
