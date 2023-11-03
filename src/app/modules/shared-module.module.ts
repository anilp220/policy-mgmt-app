import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { GenericePortfolioTableComponent } from '../components/generice-portfolio-table/generice-portfolio-table.component';
@NgModule({
  declarations: [HeaderComponent, GenericePortfolioTableComponent],
  imports: [
    CommonModule,
    IonicModule,
    HighchartsChartModule
  ],
  exports: [HeaderComponent, HighchartsChartModule, GenericePortfolioTableComponent]
})
export class SharedModuleModule { }
