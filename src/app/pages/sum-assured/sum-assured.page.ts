/* eslint-disable guard-for-in */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/prefer-for-of */
// eslint-disable-next-line @typescript-eslint/prefer-for-of
/* eslint-disable eqeqeq */
import { Component, ElementRef, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as Highcharts from 'highcharts';
import { HighchartService } from 'src/app/services/highchart.service';
import { Models } from 'src/app/services/models.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-sum-assured',
  templateUrl: './sum-assured.page.html',
  styleUrls: ['./sum-assured.page.scss'],
})
export class SumAssuredPage implements OnInit {
  highcharts: typeof Highcharts = Highcharts;
  chartOptions;
  mergedData = [];
  liData = [];
  chart;
  constructor(private userService: UserService,
    private highChartService: HighchartService,
    private navCtrl: NavController,
    private models: Models) { }

  ngOnInit(): void {
    this.liData = [...this.userService.allCollections[this.models.collections.lifeInsurance]];
    const holder = {};
    const plotData = [];
    this.liData.forEach((d) => {
      const nameOfLifeInsured = d.nameOfLifeInsured?.toLowerCase();
      if (holder.hasOwnProperty(nameOfLifeInsured)) {
        holder[nameOfLifeInsured] = holder[nameOfLifeInsured] + d.sumAssured;
      } else {
        holder[nameOfLifeInsured] = d.sumAssured;
      }
    });
    this.mergedData = [];
    for (const prop in holder) {
      this.mergedData.push({ nameOfLifeInsured: prop, sumAssured: holder[prop] });
    }

    for (let i = 0; i < this.mergedData.length; i++) {
      const ele = this.mergedData[i];
      const innerItem = [ele.nameOfLifeInsured, ele.sumAssured];
      plotData.push(innerItem);
    }
    this.mergedData = this.mergedData.sort((a, b) => b.sumAssured - a.sumAssured);
    setTimeout(() => {
      this.chartOptions = this.highChartService.getDonutChart(plotData, true,null,true);
    }, 0);
  }

  onClick(item) {
    const foundItems = this.liData.filter(el => el.nameOfLifeInsured.toLowerCase() === item.nameOfLifeInsured.toLowerCase());
    this.navCtrl.navigateForward('tabs/sum-assured-detail', {
      state: {
        item: JSON.stringify(foundItems),
        title: item.nameOfLifeInsured
      }
    });
  }
}
