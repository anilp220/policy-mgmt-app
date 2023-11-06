/* eslint-disable max-len */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProductType } from 'src/app/enums/product-type-enum';
import { AppService } from 'src/app/services/app.service';
import { FixedDepositService } from 'src/app/services/collection-services/fixed-deposit.service';
import { LifeInsuranceService } from 'src/app/services/collection-services/life-insurance.service';
import { MutualFundService } from 'src/app/services/collection-services/mutual-fund.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upcoming-maturities',
  templateUrl: './upcoming-maturities.page.html',
  styleUrls: ['./upcoming-maturities.page.scss'],
})
export class UpcomingMaturitiesPage implements OnInit {

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
  maturitiesArr: unknown[];
  maturitiesObj: any;
  constructor(private popoverController: PopoverController,
    private liService: LifeInsuranceService,
    private mfService: MutualFundService,
    private appService: AppService,
    private fdService: FixedDepositService,
    private userService: UserService) { }

  ngOnInit() {
    this.tableTitle = [
      ['Investor Name','Product Type'],
      ['Company', 'DOC'],
      ['Return Type', 'Return Date'],
      ['Total Investment'],
      ['Maturity','IRR']
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

 async dismissPopover(){
    const popover = await this.popoverController.getTop();
    if(popover){
      this.popoverController.dismiss();
    }
  }

  resetYearObj(noOfYears) {
    this.maturitiesObj = {};
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < noOfYears; i++) {
      this.maturitiesObj[currentYear + i] = {
        year: currentYear + i,
        data: [],
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
      if (element.dateOfMaturity || element.maturityDate) {
        const maturityDate = new Date(element.dateOfMaturity);
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
          item.amountInvested || 0);
        this.maturitiesObj[item.maturityYear].tableData.data.push(this.mapCollection(item));
        this.maturitiesObj[item.maturityYear].tableData.item.push(item);
      }
    });
    this.maturitiesArr = Object.values(this.maturitiesObj);
    // // this.getChartOptions();
    // console.log(this.renewalsObj);
    // console.log(this.renewalsArr);
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
          [item.missing,item.irr]
        ];
      case ProductType.mutualFund:
        return [
          [item.investorName, item.productType],
          [item.company?.name, item.dateOfPurchase],
          [item.dateOfPurchase, item.missing],
          [item.totalInvestment],
          [item.expectedFundValue,item.missing]
        ];
      case ProductType.equities:
        return [
          [item.investorName, item.productType],
          [item.company?.name, item.dateOfPurchase],
          [item.dateOfIssuance, item.missing],
          [item.amountInvested],
          [item.missing,item.missing]
        ];
      case ProductType.fixedDeposit:
        return [
          [item.firstholder, item.productType],
          [item.issuingAuthorityName, item.dateOfIssuance],
          [item.doc, item.maturityDate],
          [item.totalInvestment],
          [item.maturityValue,item.missing]
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
    if(data){
      this.appService.gotoPolicyDetail(data, item.productType, null, item);
    }
  }
}
