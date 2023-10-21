/* eslint-disable guard-for-in */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/prefer-for-of */
// eslint-disable-next-line @typescript-eslint/prefer-for-of
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Models } from 'src/app/services/models.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-sum-assured',
  templateUrl: './sum-assured.page.html',
  styleUrls: ['./sum-assured.page.scss'],
})
export class SumAssuredPage implements OnInit {
  colors = [
    '#ffb3ba',
    '#ffdfba',
    '#ffffba',
    '#baffc9',
    '#bae1ff',
    '#ff8b94',
    '#ffaaa5',
    '#ffd3b6',
    '#dcedc1',
    '#a8e6cf',
  ];
  highcharts: typeof Highcharts = Highcharts;
  chartOptions;
  mergedData = [];
  liData = [];
  constructor(private userService: UserService, private models: Models) { }
  ngOnInit(): void {
    console.log(this.userService.allCollections[this.models.collections.lifeInsurance]);
    this.liData = [...this.userService.allCollections[this.models.collections.lifeInsurance]];
    const holder = {};
    const plotData = [];
    this.liData.forEach((d) => {
      if (holder.hasOwnProperty(d.nameOfLifeInsured)) {
        holder[d.nameOfLifeInsured] = holder[d.nameOfLifeInsured] + d.sumAssured;
      } else {
        holder[d.nameOfLifeInsured] = d.sumAssured;
      }
    });
    this.mergedData = [];
    for (const prop in holder) {
      this.mergedData.push({ nameOfLifeInsured: prop, sumAssured: holder[prop] });
    }

    for (let i = 0; i < this.mergedData.length; i++) {
      const ele = this.mergedData[i];
      const innerItem = [ele.nameOfLifeInsured + '<br>' + ele.sumAssured, ele.sumAssured];
      plotData.push(innerItem);
    }
    this.mergedData = this.mergedData.sort((a, b) => b.sumAssured - a.sumAssured);
    this.chartOptions = {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        margin: 0,
      },
      title: {
        text: ''
      },
      plotOptions: {
        pie: {
          // slicedOffset: 10,
          center: ['50%', '50%']
        }
      },
      tooltip: {
        formatter() {
          return '<b>' + this.point.name + '</b>: ' + this.y;
        }
      },
      series: [{
        data: plotData,
        size: '80%',
        innerSize: '50%',
        showInLegend: false,
        type: 'pie',
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '15px',
            fontWeight: 'bold'
          }
        },
        colors: this.colors
      }],
      legend: {
        enabled: true,
        align: 'left',
        layout: 'horizontal',
      },
      credits: {
        enabled: false
      },
    };
  }
  onClick(item) {
    const foundItems = this.liData.filter(el => el.nameOfLifeInsured === item.nameOfLifeInsured);
    console.log(foundItems);
  }
}
