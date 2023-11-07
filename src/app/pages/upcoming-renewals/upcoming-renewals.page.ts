/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { HighchartService } from 'src/app/services/highchart.service';
import { UserService } from 'src/app/services/user.service';
import { ChartConfiguration } from 'chart.js';

import * as Highcharts from 'highcharts';
import { AppService } from 'src/app/services/app.service';
import { ProductType } from 'src/app/enums/product-type-enum';
import { LifeInsuranceService } from 'src/app/services/collection-services/life-insurance.service';
import { HealthInsuranceService } from 'src/app/services/collection-services/health-insurance.service';
import { CorporateInsuranceService } from 'src/app/services/collection-services/corporate-insurance.service';
import { MutualFundService } from 'src/app/services/collection-services/mutual-fund.service';
import { VehicleInsuranceService } from 'src/app/services/collection-services/vehicleInsurance.service';
import { FixedDepositService } from 'src/app/services/collection-services/fixed-deposit.service';
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

  chartOptions;
  months = [
    {
      month: 1,
      isClicked: true,
    },
    {
      month: 3,
      isClicked: false,
    },
    {
      month: 6,
      isClicked: false,
    }, {
      month: 12,
      isClicked: false,
    }
  ];
  tableTitle = [];
  renewalsObj = {};
  renewalsArr = [];
  public annualPremiumPayChart: any;
  public lifetimeRenewalsChart: any;
  constructor(
    private userService: UserService,
    private highChartService: HighchartService,
    private appService: AppService,
    private liService: LifeInsuranceService,
    private hiService: HealthInsuranceService,
    private corporateService: CorporateInsuranceService,
    private mfService: MutualFundService,
    private viService: VehicleInsuranceService,
    private fdService: FixedDepositService
  ) { }

  async ngOnInit() {
    this.tableTitle = [
      ['Product Type', 'Policy Type'],
      ['Investor Name', 'Company'],
      ['DOC', 'Frequency'],
      ['Renewal Date'],
      ['Amount']
    ];
    this.onMonthClick(1);
  }

  onMonthClick(index) {
    this.renewalsObj = {};
    for (let i = 0; i < this.months.length; i++) {
      if (index === i) {
        this.months[i].isClicked = true;
      } else {
        this.months[i].isClicked = false;
      }
    }
    this.resetMonthObj(this.months[index].month);
  }

  resetMonthObj(month) {
    this.renewalsObj = {};
    const currentMonth = new Date().getMonth();
    let count = 0;
    for (let i = 0; i < month; i++) {
      let monthIndex = currentMonth + i;
      if (monthIndex > 11) {
        monthIndex = count;
        count++;
      }
      this.renewalsObj[this.getMonthName(monthIndex)] = {
        month: this.getMonthName(monthIndex),
        data: [],
        tableData: {
          item: [],
          data: [],
          renewals: true
        },
        totalSum: 0
      };
    }
    this.filterDataByMonth(month);
  }

  filterDataByMonth(month: number) {
    const mergedData = this.mergeAllData();
    this.getRenewals(mergedData, month);
  }

  convertKeyToName(key: string) {
    return key.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
      .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase());
  }

  mergeAllData() {
    const mergedData = [];
    const allData = { ...this.userService.allCollections };
    for (const key in allData) {
      if (Object.prototype.hasOwnProperty.call(allData, key)) {
        const element = allData[key];
        element.forEach(colData => {
          colData.productType = this.convertKeyToName(key);
          if (colData.productType !== ProductType.equities ||
            colData.productType !== ProductType.fixedDeposit){
              mergedData.push(colData);
            }
        });
      }
    }
    return mergedData;
  }

  getRenewals(data: any[], month) {
    const renewals = [];
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear +1;
    data.forEach(element => {
      if (element.renewalDate && new Date(element.renewalDate).getFullYear() >= currentYear && new Date(element.renewalDate).getFullYear() <= nextYear) {
        const renewalDate = new Date(element.renewalDate);
        if (this.isDateInRange(renewalDate, month)) {
          element.renewalMonth = this.getMonthName(renewalDate.getMonth());
          renewals.push(element);
        }
      }
    });
    renewals.forEach((item) => {
      if (this.renewalsObj[item.renewalMonth]) {
        this.renewalsObj[item.renewalMonth].totalSum += (
          item.annualPremium ||
          item.premium ||
          item.modalPremium ||
          item.amountInvested || 0);
        this.renewalsObj[item.renewalMonth].tableData.data.push(this.mapCollection(item));
        this.renewalsObj[item.renewalMonth].tableData.item.push(item);
      }
    });
    this.renewalsArr = Object.values(this.renewalsObj);
    this.getChartOptions();
    this.getLifetimeMaturityChartOption();
    console.log(this.renewalsObj);
    console.log(this.renewalsArr);
  }

  getChartOptions() {
    let labels = [];
    const data = [];
    this.renewalsArr.forEach(item => {
      if (item.totalSum > 0) {
        labels.push(item.month);
        data.push(item.totalSum);
      }
    });
    setTimeout(() => {
      labels =labels.map(cat=>cat.slice(0,3));
      if(data.length){
        this.chartOptions = this.highChartService.getBarChart(labels, data,'Renewal Amount',null,null,true);
      }else {this.chartOptions = null;}
    }, 0);
  }

  getMonthName(month: number): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month];
  }

  isDateInRange(date, month) {
    const currentDate = new Date();
    const threeMonthsFromNow = new Date(currentDate);
    threeMonthsFromNow.setMonth(currentDate.getMonth() + month);
    return date >= currentDate && date <= threeMonthsFromNow;
  }

  gotoDetail(item) {
    console.log(item);
    let data;
    switch (item.productType) {
      case ProductType.corporateInsurance:
        data = this.corporateService.getDetails(item);
        break;
      case ProductType.lifeInsurance:
        data = this.liService.getDetails(item);
        break;
      case ProductType.mediclaim:
        data = this.hiService.getDetails(item);
        break;
      case ProductType.mutualFund:
        data = this.mfService.getDetails(item);
        break;
      case ProductType.vehicleInsurance:
        data = this.viService.getDetails(item);
        break;
      case ProductType.loans:
        break;
      // case ProductType.equities:
      //   break;
      // case ProductType.fixedDeposit:
      //   data = this.fdService.getDetails(item);
      //   break;
      default:
        break;
    }
    console.log(data);
    if(data){
      this.appService.gotoPolicyDetail(data, item.productType, null, item);
    }
  }

  mapCollection(item) {
    switch (item.productType) {
      case ProductType.corporateInsurance:
        return [
          [item.productType, item.typeOfPolicy],
          [item.ownerName, item.companyName],
          [item.purchaseDate, item.policyPeriod],
          [item.renewalDate],
          [item.premium]
        ];
      case ProductType.lifeInsurance:
        return [
          [item.productType, item.typeOfPolicy],
          [item.proposerName, item.company],
          [item.doc, item.mode],
          [item.renewalDate],
          [item.modalPremium]
        ];
      case ProductType.loans:
        return [
          [item.productType, item.loanType],
          [item.loanLenderName, item.company],
          [item.doc, item.mode],
          [item.renewalDate],
          [item.annualPremium]
        ];
      case ProductType.mediclaim:
        return [
          [item.productType, item.typeOfPolicy],
          [item.proposer, item.company],
          [item.purchaseDate, item.policyPeriod],
          [item.renewalDate],
          [item.premium]
        ];
      case ProductType.mutualFund:
        return [
          [item.productType, item.typeOfPolicy],
          [item.investorName, item.company?.name],
          [item.dateOfPurchase, item.modeOfInvestment],
          [item.renewalDate],
          [item.amountInvested]
        ];
      case ProductType.vehicleInsurance:
        return [
          [item.productType, item.typeOfPolicy],
          [item.nameOfOwner, item.insuranceCompany],
          [item.purchaseDate, item.policyPeriod],
          [item.renewalDate],
          [item.premium]
        ];
      default:
        break;
    }
  }

  getLifetimeMaturityChartOption() {
    const labels = [];
    const data = [];
    const mydob = new Date(this.userService.user.userInfo.dob);
    const thisYear = (new Date()).getFullYear();
    for (let year = thisYear; year <= thisYear + 100; year++) {
      let totalMaturityValue = 0;
      for (const policy of this.renewalsArr) {
        totalMaturityValue += this.getMaturityForYear(policy, year);
      }
      if (totalMaturityValue === 0) { continue; };
      const ageDiff = year - mydob.getFullYear();
      labels.push(year + ' - ' + (ageDiff - 1));
      data.push(totalMaturityValue);
    }
    setTimeout(() => {
        this.lifetimeRenewalsChart = this.highChartService.getBarChart(labels, data, 'Lifetime Maturity','','Year - Age',true);
    }, 0);
  }

  getMaturityForYear(policy, year) {
    let sum = 0;
    policy.tableData?.item?.forEach(item => {
      const renewalAmount = item.premium||item.modalPremium||item.annualPremium||item.amountInvested;
      const renewalDate = item.renewalDate;
      const policyRenewalDate = new Date(renewalDate);
      sum += year === policyRenewalDate.getFullYear() ? renewalAmount : 0;
    });
    return sum;
  }
}
