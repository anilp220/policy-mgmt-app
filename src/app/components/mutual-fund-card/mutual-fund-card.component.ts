/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Models } from 'src/app/services/models.service';
import { UserService } from 'src/app/services/user.service';
enum sipType {
  SIP = 'SIP',
  LUMPSUM = 'Lump Sum',
  LUMPSUMSIP = 'Lump Sum + SIP'
}
@Component({
  selector: 'app-mutual-fund-card',
  templateUrl: './mutual-fund-card.component.html',
  styleUrls: ['./mutual-fund-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MutualFundCardComponent implements OnInit {
  @Input() data = [];
  @Input() investorName;
  @Input() pageTitle;
  sipType = sipType;
  portfolioData = [
    { title: 'INVESTOR DETAILS', data: [] },
    { title: 'INVESTMENT DETAIL', data: [] },
    { title: 'FUTURE VALUES OF INVESTMENT', data: [] },
    { title: 'RETURN PERFORMANCE', data: [] }
  ];
  tableTitle = [];
  tableData = {
    item: null,
    data: []
  };

  constructor(private userService: UserService,
    private appService: AppService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.buildGenericeTableData();
  }

  async buildGenericeTableData() {
    this.tableTitle = [
      ['COMPANY'],
      ['D.O.P.'],
      ['INVESTED VALUE'],
      ['FUND VALUE'],
      ['RETURN']
    ];
    for (const item of this.data) {
      await this.calculateFundValue(item);
      this.tableData.item = item;
      this.tableData.data.push([
        [item.company.name],
        [item.dateOfPurchase],
        [item.currentInvestedValue],
        [item.currentFundValue],
        [item.currentReturn + '%']
      ]);
    }
    this.cdr.detectChanges();
  }

  gotoDetail(item) {
    this.portfolioData[0].data = this.investorDetail(item);
    this.portfolioData[1].data = this.investmentDetail(item);
    this.portfolioData[2].data = this.futureValues(item);
    this.portfolioData[3].data = this.returnPerformance(item);
    this.appService.gotoPolicyDetail(this.portfolioData, this.pageTitle, this.investorName, item);
  }

  calcCurrentReturn(item) {
    if ((item.modeOfInvestment === this.sipType.SIP ||
      item.modeOfInvestment === this.sipType.LUMPSUMSIP) && item.currentFundValue && item.currentInvestedValue) {
      item.currentReturn = Math.abs(((item.currentFundValue - item.currentInvestedValue) / item.currentInvestedValue) * 100).toFixed(4);
    }
    if (item.modeOfInvestment === this.sipType.LUMPSUM && item.currentFundValue && item.amountInvested) {
      item.currentReturn = Math.abs(((item.currentFundValue - item.amountInvested) / item.amountInvested) * 100).toFixed(4);
    }
    this.cdr.detectChanges();
  }

  async calculateFundValue(item): Promise<any> {
    if (item.currentUnits && item.currentNav) {
      item.currentFundValue = (item.currentUnits * await this.getCurrentNav(item)).toFixed(4);
      this.calcCurrentReturn(item);
    }
  }

  async getCurrentNav(item) {
    const result = await this.userService.fetchSelectedScheme(item.company.id);
    await this.appService.hideLoading();
    return result.nav;
  }

  investorDetail(item) {
    const obj = [
      {
        key: 'Investor Name',
        value: item.investorName
      }, {
        key: 'Minor/Major',
        value: item.minorMajor
      }, {
        key: 'PAN No.',
        value: item.panNo
      }, {
        key: 'Mobile No.',
        value: item.mobile
      }, {
        key: 'Email ID',
        value: item.email
      }, {
        key: 'Kyc Updated',
        value: item.kycUpdated
      }, {
        key: 'Bank Details',
        value: item.bankDetails
      }, {
        key: 'Life Type',
        value: item.lifeType
      }, {
        key: 'Nominee Holder 1',
        value: item.nomineeHolder
      },
    ];
    return obj;
  }

  investmentDetail(item) {
    const obj = [
      {
        key: 'Company Name',
        value: item.company.name?.split('-')[0]
      },
      {
        key: 'Fund Category',
        value: item.fundCategory
      },
      {
        key: 'Fund Type',
        value: item.fundType
      },
      {
        key: 'Folio No.',
        value: item.folioNo
      },
      {
        key: 'Plan Name',
        value: item.planName
      },
      {
        key: 'Options',
        value: item.option
      },
      {
        key: 'Tax Saver ',
        value: item.taxSaver
      },
      {
        key: 'Purchase Details',
        value: this.purchaseDetails(item)
      },
      {
        key: 'Agent/Broker',
        value: item.agent
      },
    ];
    return obj;
  }

  purchaseDetails(item) {
    return [
      {
        key: 'Date of Purchase',
        value: item.dateOfPurchase
      },
      {
        key: 'Mode of Investment',
        value: item.modeOfInvestment
      },
      {
        key: 'Status',
        value: item.status
      },
      {
        key: 'Lump Sum Invested Amount',
        value: item.modeOfInvestment === sipType.LUMPSUMSIP ? item.lumpSumSIPamountInvested : 'NA'
      },
      {
        key: 'SIP Amount',
        value: item.modeOfInvestment !== sipType.LUMPSUM ? item.amountInvested : 'NA'
      },
      {
        key: 'SIP Date',
        value: item.modeOfInvestment !== sipType.LUMPSUM ? item.sipDate : 'NA'
      },
      {
        key: 'Annual SIP Invesment',
        value: item.modeOfInvestment !== sipType.LUMPSUM ? item.annualSIPInvestment : 'NA'
      },
      {
        key: 'Current Units',
        value: item.currentUnits
      },
      {
        key: 'Current Nav',
        value: item.currentNav
      },
      {
        key: 'Current Invested Value',
        value: item.currentInvestedValue
      },
      {
        key: 'Current Fund Value',
        value: item.currentFundValue
      },
      {
        key: 'Current Return',
        value: item.currentReturn
      },
      {
        key: 'Tax Benefit',
        value: item.taxBenefit
      },
    ];
  }

  futureValues(item) {
    const obj = [
      {
        key: 'Purpose of Invesment',
        value: item.purposeOfInvestment
      },
      {
        key: 'Term of Investment (Months)',
        value: item.termOfInvestment
      },
      {
        key: 'Total Investment in tenure',
        value: item.totalInvestment
      },
      {
        key: 'Expected Return in Tenure(%)',
        value: item.expectedReturn + '%'
      },
      {
        key: 'Expected Fund Value',
        value: item.expectedFundValue
      },
      {
        key: 'Maturity',
        value: item.maturity
      },
    ];
    return obj;
  }

  returnPerformance(item) {
    const obj = [
      {
        key: 'RETURN PERFORMANCE SINCE INCEPTION',
        value: item.returnPerformance
      }
    ];
    return obj;
  }
}
