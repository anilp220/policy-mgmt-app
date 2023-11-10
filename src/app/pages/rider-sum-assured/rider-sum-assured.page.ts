/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as Highcharts from 'highcharts';
import { HighchartService } from 'src/app/services/highchart.service';
import { Models } from 'src/app/services/models.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-rider-sum-assured',
  templateUrl: './rider-sum-assured.page.html',
  styleUrls: ['./rider-sum-assured.page.scss'],
})
export class RiderSumAssuredPage implements OnInit {
  highcharts: typeof Highcharts = Highcharts;
  chartOptions;
  mergedData = [];
  liData = [];
  mediclaimData = [];
  chart;
  diseasesObj: any = {};
  constructor(private userService: UserService,
    private highChartService: HighchartService,
    private navCtrl: NavController,
    private models: Models) { }

  ngOnInit(): void {
    const liData = [...this.userService.allCollections[this.models.collections.lifeInsurance]];
    const mediclaimData = [...this.userService.allCollections[this.models.collections.mediclaim]];
    const holder = {};
    const plotData = [];
    this.mergeLi(liData, holder);
    this.mergeMediclaim(mediclaimData, holder);
    this.mergedData = [];
    for (const prop in holder) {
      this.mergedData.push({ name: prop, diseases: holder[prop] });
    }
    console.log(this.mergedData);
    for (let i = 0; i < this.mergedData.length; i++) {
      const ele = this.mergedData[i];
      const innerItem = [ele.name,this.mergeArray(ele.diseases).length  ];
      plotData.push(innerItem);
    }
    setTimeout(() => {
      this.chartOptions = this.highChartService.getDonutChart(plotData, true, true);
    }, 0);
  }

  countDiesease(arr): number {
    return this.mergeArray(arr).length;
  }

  mergeArray(arr: any[]): any[] {
    const obj = {};
    const mergedArr = [];
    for (const d of arr) {
      const dName = d.disease;
      if (obj.hasOwnProperty(dName)) {
        obj[dName].sumAssured = (obj[dName].sumAssured || 0) + (d.sumAssured || 0);
        const elementExist = obj[dName].items.find(el => el.id === d.item.id);
        if (!elementExist) {
          d.item.productType = d.productType;
          obj[dName].items.push(d.item);
        }
      } else {
        obj[dName] = d;
        d.item.productType = d.productType;
        obj[dName].items = [d.item];
      }
    }
    for (const prop in obj) {
      mergedArr.push(obj[prop]);
    }
    return mergedArr;
  }

  mergeLi(arr, holder) {
    arr.forEach((d) => {
      const diseases = [];
      if (d.riders && d.riders.length) {
        for (const rider of d.riders) {
          if (rider.coverages?.length) {
            for (const covg of rider.coverages) {
              diseases.push({ ...covg, item: d, productType: 'Life Insurance' });
            }
          }
        }
      }
      if (holder.hasOwnProperty(d.nameOfLifeInsured?.toLowerCase())) {
        holder[d.nameOfLifeInsured?.toLowerCase()].push(diseases);
      } else {
        holder[d.nameOfLifeInsured?.toLowerCase()] = [diseases];
      }
      holder[d.nameOfLifeInsured?.toLowerCase()] = holder[d.nameOfLifeInsured?.toLowerCase()].flat();
    });
  }

  mergeMediclaim(arr, holder) {
    arr.forEach((d) => {
      const diseases = [];
      if (d.newDisease && d.newDisease.length) {
        for (const disease of d.newDisease) {
          diseases.push({ ...disease, item: d, productType: 'Health Insurance' });
        }
      }
      if (holder.hasOwnProperty(d.proposer?.toLowerCase())) {
        holder[d.proposer?.toLowerCase()].push(diseases);
      } else {
        holder[d.proposer?.toLowerCase()] = [diseases];
      }
      holder[d.proposer?.toLowerCase()] = holder[d.proposer?.toLowerCase()].flat();
    });
  }

  onClick(item) {
    console.log(item);
    const dieseases = this.mergeArray(item.diseases);
    this.navCtrl.navigateForward('tabs/rider-sum-assured-detail', {
      state: {
        item: JSON.stringify(dieseases),
        title: item.name
      }
    });
  }
}
