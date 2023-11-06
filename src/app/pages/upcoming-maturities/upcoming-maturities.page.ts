/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import * as Highcharts from 'highcharts';
import { ProductType } from 'src/app/enums/product-type-enum';
import { AppService } from 'src/app/services/app.service';
import { FixedDepositService } from 'src/app/services/collection-services/fixed-deposit.service';
import { LifeInsuranceService } from 'src/app/services/collection-services/life-insurance.service';
import { MutualFundService } from 'src/app/services/collection-services/mutual-fund.service';
import { HighchartService } from 'src/app/services/highchart.service';
import { UserService } from 'src/app/services/user.service';
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
  selector: 'app-upcoming-maturities',
  templateUrl: './upcoming-maturities.page.html',
  styleUrls: ['./upcoming-maturities.page.scss'],
})
export class UpcomingMaturitiesPage implements OnInit {
  highcharts: typeof Highcharts = Highcharts;

  tableTitle = [];
  tableData = {
    item: null,
    data: [],
    noData: 'NO RENEWALS THIS MONTH'
  };
  years = [
    { isClicked: true, year: '1 YEAR' },
    { isClicked: false, year: '5 YEARS' },
    { isClicked: false, year: '10 YEARS' },
    { isClicked: false, year: '15 YEARS' },
    { isClicked: false, year: '20 YEARS' },
    { isClicked: false, year: '25 YEARS' },
    { isClicked: false, year: '30 YEARS' },
    { isClicked: false, year: '35 YEARS' },
    { isClicked: false, year: '40 YEARS' },
    { isClicked: false, year: '45 YEARS' },
    { isClicked: false, year: '50 YEARS' },
  ];
  selectedYear;
  showSubmenu = false;
  maturitiesArr: any[];
  maturitiesObj: any;
  upcomingMaturitychart: any;
  lifetimeMaturityChart: any;
  constructor(private popoverController: PopoverController,
    private liService: LifeInsuranceService,
    private mfService: MutualFundService,
    private appService: AppService,
    private fdService: FixedDepositService,
    private highChartService: HighchartService,
    private userService: UserService) { }

  ngOnInit() {
    this.tableTitle = [
      ['Investor Name', 'Product Type'],
      ['Company', 'DOC'],
      ['Return Type', 'Return Date'],
      ['Total Investment'],
      ['Maturity', 'IRR']
    ];
    this.yearSelected(1);
  }

  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  yearSelected(index) {
    this.selectedYear = this.years[index].year;
    const selectedYear = this.selectedYear.split(' ')[0];
    for (let i = 0; i < this.years.length; i++) {
      if (index === i) {
        this.years[i].isClicked = true;
      } else {
        this.years[i].isClicked = false;
      }
    }
    this.resetYearObj(Number(selectedYear));
    this.dismissPopover();
  }

  async dismissPopover() {
    const popover = await this.popoverController.getTop();
    if (popover) {
      this.popoverController.dismiss();
    }
  }

  getUpcomingMaturityChartOptions() {
    const labels = [];
    const data = [];
    console.log(this.maturitiesArr);
    this.maturitiesArr.forEach(item => {
      if (item.totalSum > 0) {
        labels.push(item.year);
        data.push(item.totalSum);
      }
    });
    setTimeout(() => {
      if (this.selectedYear.split(' ')[0] <= 5) {
        this.upcomingMaturitychart = this.highChartService.getBarChart(labels, data, 'Upcoming Maturity','','Year',true);
      }else {
        this.upcomingMaturitychart = null;
      }
    }, 0);
  }

  getLifetimeMaturityChartOption() {
    const labels = [];
    const data = [];
    const mydob = new Date(this.userService.user.userInfo.dob);
    const thisYear = (new Date()).getFullYear();
    for (let year = thisYear; year <= thisYear + 100; year++) {
      let totalMaturityValue = 0;
      for (const policy of this.maturitiesArr) {
        totalMaturityValue += this.getMaturityForYear(policy, year);
      }
      if (totalMaturityValue === 0) { continue; };
      const ageDiff = year - mydob.getFullYear();
      labels.push(year + ' - ' + (ageDiff - 1));
      data.push(totalMaturityValue);
    }
    setTimeout(() => {
        this.lifetimeMaturityChart = this.highChartService.getBarChart(labels, data, 'Lifetime Maturity','','Year - Age',true);
    }, 0);
  }

  getMaturityForYear(policy, year) {
    let sum = 0;
    policy.tableData?.item?.forEach(item => {
      const maturityDate = item.dateOfPurchase||item.dateOfMaturity||item.maturityDate;
      const policyMaturityDate = new Date(maturityDate);
      const maturityValue = item.maturityValue ||item.expectedFundValue;
      sum += year === policyMaturityDate.getFullYear() ? maturityValue : 0;
    });
    return sum;
  }

  resetYearObj(noOfYears) {
    this.maturitiesObj = {};
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < noOfYears; i++) {
      this.maturitiesObj[currentYear + i] = {
        year: currentYear + i,
        tableData: {
          item: [],
          data: [],
          maturities: true
        },
        totalSum: 0
      };
    }
    this.filterDataByYear(noOfYears);
  }

  filterDataByYear(noOfYears: number) {
    const mergedData = this.mergeAllData();
    this.getMaturities(mergedData, noOfYears);
  }

  mergeAllData() {
    const mergedData = [];
    const allData = { ...this.userService.allCollections };
    for (const key in allData) {
      if (Object.prototype.hasOwnProperty.call(allData, key)) {
        const element = allData[key];
        element.forEach(colData => {
          colData.productType = this.convertKeyToName(key);
          if (colData.productType == ProductType.lifeInsurance ||
            colData.productType == ProductType.mutualFund ||
            colData.productType == ProductType.equities ||
            colData.productType == ProductType.fixedDeposit) {
            mergedData.push(colData);
          }
        });
      }
    }
    return mergedData;
  }

  convertKeyToName(key: string) {
    return key.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
      .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase());
  }

  getMaturities(data: any[], noOfYears: number) {
    const maturities = [];
    data.forEach(element => {
      let maturityDate = element.dateOfMaturity || element.maturityDate;
      if (maturityDate) {
        maturityDate = new Date(maturityDate);
        if (element.productType === ProductType.fixedDeposit && element.payoutDetails?.length) {
          element.payoutDetails.forEach(payout => {
            const payoutElement = { ...element };
            const payoutMaturityDate = new Date(payout.date);
            if (this.isDateInRange(payoutMaturityDate, noOfYears)) {
              payoutElement.maturityYear = new Date(payoutMaturityDate).getFullYear();
              payoutElement.maturityDate = payoutMaturityDate;
              payoutElement.maturityValue = payout.amount;
              payoutElement.returnType = 'Moneyback';
              maturities.push(payoutElement);
            }
          });
        }
        if (this.isDateInRange(maturityDate, noOfYears)) {
          element.maturityYear = new Date(maturityDate).getFullYear();
          maturities.push(element);
        }
      }
    });
    maturities.forEach((item) => {
      if (this.maturitiesObj[item.maturityYear]) {
        this.maturitiesObj[item.maturityYear].totalSum += (
          item.annualPremium ||
          item.premium ||
          item.modalPremium ||
          item.amountInvested ||
          item.maturityValue || 0);
        this.maturitiesObj[item.maturityYear].tableData.data.push(this.mapCollection(item));
        this.maturitiesObj[item.maturityYear].tableData.item.push(item);
      }
    });
    this.maturitiesArr = Object.values(this.maturitiesObj);
    this.getUpcomingMaturityChartOptions();
    this.getLifetimeMaturityChartOption();
  }

  isDateInRange(date, noOfYears) {
    const currentDate = new Date();
    const threeMonthsFromNow = new Date(currentDate);
    threeMonthsFromNow.setFullYear(currentDate.getFullYear() + noOfYears);
    return date >= currentDate && date <= threeMonthsFromNow;
  }

  mapCollection(item) {
    switch (item.productType) {
      case ProductType.lifeInsurance:
        return [
          [item.proposerName, item.productType],
          [item.company, item.doc],
          [item.purchaseDate, item.dateOfMaturity],
          [item.totalInvestment],
          [item.maturityValue, item.irr + '%']
        ];
      case ProductType.mutualFund:
        item.returnType = 'Maturity';
        return [
          [item.investorName, item.productType],
          [item.company?.name, item.dateOfPurchase],
          [item.returnType, item.returnDate],
          [item.totalInvestment],
          [item.expectedFundValue, item.currentReturn + '%']
        ];
      case ProductType.equities:
        item.returnType = 'Maturity';
        return [
          [item.investorName, item.productType],
          [item.company?.name, item.dateOfPurchase],
          [item.returnType, item.dateOfMaturity],
          [item.amountInvested],
          [item.maturityValue, item.currentReturn + '%']
        ];
      case ProductType.fixedDeposit:
        if (!item.returnType) {
          item.returnType = 'Maturity';
        }
        return [
          [item.firstholder, item.productType],
          [item.issuingAuthorityName, item.dateOfIssuance],
          [item.returnType, item.maturityDate],
          [item.totalInvestment],
          [item.maturityValue, item.returnOnInvestment + '%']
        ];
      default:
        break;
    }
  }

  gotoDetail(item) {
    console.log(item);
    let data;
    switch (item.productType) {
      case ProductType.lifeInsurance:
        data = this.liService.getDetails(item);
        break;
      case ProductType.mutualFund:
        data = this.mfService.getDetails(item);
        break;
      case ProductType.equities:
        break;
      case ProductType.fixedDeposit:
        data = this.fdService.getDetails(item);
        break;
      default:
        break;
    }
    console.log(data);
    if (data) {
      this.appService.gotoPolicyDetail(data, item.productType, null, item);
    }
  }
}
