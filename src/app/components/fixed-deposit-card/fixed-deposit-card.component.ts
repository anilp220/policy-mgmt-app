import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-fixed-deposit-card',
  templateUrl: './fixed-deposit-card.component.html',
  styleUrls: ['./fixed-deposit-card.component.scss'],
})
export class FixedDepositCardComponent implements OnInit {
  @Input() data = [];
  @Input() investorName;
  @Input() pageTitle;
  portfolioData = [
    { title: '', data: [] },
  ];
  tableTitle = [];
  tableData = {
    item: null,
    data: []
  };
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.buildGenericeTableData();
    this.portfolioData[0].title = this.investorName.split('-')[0];
  }

  buildGenericeTableData() {
    this.tableTitle = [
      ['ISSUING AUTHORITY'],
      ['D.O.I.', 'TENURE'],
      ['INVESTMENT'],
      ['MATURITY'],
      ['STATUS']
    ];
    this.data.forEach(item => {
      this.tableData.item = item;
      this.tableData.data.push([
        [item.issuingAuthorityName],
        [item.dateOfIssuance, item.investmentTenure],
        [item.investmentAmount],
        [item.maturityValue],
        [item.status],
      ]);
    });
  }

  gotoDetail(item) {
    console.log(item);
    this.portfolioData[0].data = this.policytDetails(item);
    this.appService.gotoPolicyDetail(this.portfolioData, this.pageTitle, this.investorName, item);
  }

  policytDetails(item) {
    return [
      {
        key: 'NAME OF 1ST HOLDER',
        value: item.firstholder
      },
      {
        key: 'ACCOUND HOLDER D.O.B',
        value: item.dobAccountHolder
      },
      {
        key: 'NAME OF 2ND HOLDER',
        value: this.getHolderName(item.secondHolders, 0),
      },
      {
        key: 'NAME OF 3RD HOLDER',
        value: this.getHolderName(item.secondHolders, 1),
      },
      {
        key: 'NOMINEE NAME',
        value: item.nomineeName
      },
      {
        key: 'NOMINEE D.O.B',
        value: item.nomineeNameDob
      },
      {
        key: 'ACCOUNT HOLDER BANK DETAILS',
        value: item.accountHolderBankDetail
      },
      {
        key: 'INVESTMENT DETAILS',
        value: this.getInvestmentDetail(item),
      },
      {
        key: 'MONEY BACK DETAILS',
        value: this.getMoneyBackDetail(item)
      },
      {
        key: 'MATURITY DETAILS',
        value: this.getMaturityDetails(item),
      },
      {
        key: 'RETURN ON INVESTMENT',
        value: item.returnOnInvestment + '%'
      },
      {
        key: 'TAX BENEFIT',
        value: item.taxBenefit
      },
      {
        key: 'TAX ON MATURITY',
        value: item.taxOnMaturity
      },
      {
        key: 'STATUS',
        value: item.status
      },
    ];
  }

  getHolderName(holders: any[], index: number) {
    return holders[index]?.name || 'NA';
  }

  getInvestmentDetail(item) {
    return [];
  }

  getMoneyBackDetail(item) {
    return [];
  }

  getMaturityDetails(item) {
    return [];
  }

}
