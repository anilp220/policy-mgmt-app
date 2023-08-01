import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenericPortfolioPageRoutingModule } from './generic-portfolio-routing.module';

import { GenericPortfolioPage } from './generic-portfolio.page';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenericPortfolioPageRoutingModule
  ],
  declarations: [GenericPortfolioPage, HeaderComponent]
})
export class GenericPortfolioPageModule { }
