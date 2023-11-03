/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit,ChangeDetectorRef } from '@angular/core';
import { HighchartService } from 'src/app/services/highchart.service';
import { UserService } from 'src/app/services/user.service';
import { ChartConfiguration } from 'chart.js';

import * as Highcharts from 'highcharts';
declare let require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
require('highcharts/modules/networkgraph')(Highcharts);
@Component({
  selector: 'app-upcoming-renewals',
  templateUrl: './upcoming-renewals.page.html',
  styleUrls: ['./upcoming-renewals.page.scss'],
})
export class UpcomingRenewalsPage implements OnInit {
  highcharts: typeof Highcharts = Highcharts;

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis:'y',
    plugins:{
      tooltip:{enabled:true},
      legend:{
        display:false
      },
    },
  };
  chartOptions;
  months = [
    {
      month:1,
      isClicked:true,
    },
    {
      month:3,
      isClicked:false,
    },
    {
      month:6,
      isClicked:false,
    }, {
      month:12,
      isClicked:false,
    }
  ];
  tableTitle = [];
  renewalsObj = {};
  renewalsArr = [];
  public annualPremiumPayChart: any;
  constructor(
    private userService: UserService,
    private highChartService: HighchartService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.tableTitle = [
      ['Product Type','Policy Type'],
      ['Investor Name', 'Company'],
      ['DOC', 'Frequency'],
      ['Renewal Date'],
      ['Amount']
    ];
    this.onMonthClick(1);
  }

  onMonthClick(index){
    this.renewalsObj = {};
    for (let i = 0; i < this.months.length; i++) {
        if(index === i){
          this.months[i].isClicked=true;
        }else{
          this.months[i].isClicked=false;
        }
    }
    this.resetMonthObj(this.months[index].month);
    this.filterDataByMonth(this.months[index].month);
  }

  resetMonthObj(month){
    this.renewalsObj = {};
    const currentMonth = new Date().getMonth();
    let count = 0;
    for (let i = 0; i < month; i++) {
      let monthIndex = currentMonth +i;
      if(monthIndex>11){
        monthIndex = count;
        count++;
      }
      this.renewalsObj[this.getMonthName(monthIndex)] = {
        month : this.getMonthName(monthIndex),
        data:[],
        tableData:{
            item: null,
            data: [],
            renewals:true
        },
        totalSum:0
      };
    }
  }

  filterDataByMonth(month: number) {
    const mergedData = this.mergeAllData();
    this.getRenewals(mergedData,month);
  }

  convertKeyToName(key: string) {
    return key.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
      .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase());
  }

  mergeAllData(){
    const mergedData = [];
    const allData = {...this.userService.allCollections};
    for (const key in allData) {
      if (Object.prototype.hasOwnProperty.call(allData, key)) {
        const element = allData[key];
        element.forEach(colData => {
          colData.productType = this.convertKeyToName(key);
          mergedData.push(colData);
        });
      }
    }
    return mergedData;
  }

  getRenewals(data: any[],month){
    const renewals = [];
    data.forEach(element => {
      if(element.renewalDate && new Date(element.renewalDate).getFullYear()>=2023 && new Date(element.renewalDate).getFullYear()<=2024){
        const renewalMonth = new Date(element.renewalDate);
        if(this.isDateInRange(renewalMonth,month)){
          element.renewalMonth = this.getMonthName(renewalMonth.getMonth());
          renewals.push(element);
        }
      }
    });
    renewals.forEach((item)=>{
      if(this.renewalsObj[item.renewalMonth]){
          this.renewalsObj[item.renewalMonth].totalSum += item.annualPremium;
          this.renewalsObj[item.renewalMonth].tableData.data.push([
            [item.productType,item.typeOfPolicy],
            [item.investorName, item.company],
            [item.doc, item.mode],
            [item.renewalDate],
            [item.annualPremium]
          ]);
        }
    });
    this.renewalsArr = Object.values(this.renewalsObj);
    this.getChartOptions();
    console.log(this.renewalsObj);
    console.log(this.renewalsArr);
  }

  getChartOptions(){
    const labels =[];
    const data = [];
    this.renewalsArr.forEach(item=>{
      labels.push(item.month);
      data.push(item.totalSum);
    });
    setTimeout(() => {
      this.chartOptions = this.highChartService.getAnnualPremiumChart(labels,data);
    }, 0);
}

  getMonthName(month: number): string{
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month];
  }

  isDateInRange(date,month) {
    const currentDate = new Date();
    const threeMonthsFromNow = new Date(currentDate);
    threeMonthsFromNow.setMonth(currentDate.getMonth() + month);
    return date >= currentDate && date <= threeMonthsFromNow;
  }
}
