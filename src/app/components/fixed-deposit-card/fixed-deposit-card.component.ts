import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { FixedDepositService } from 'src/app/services/collection-services/fixed-deposit.service';

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
  constructor(private appService: AppService, private fdService: FixedDepositService) { }

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
    this.portfolioData = this.fdService.getDetails(item);
    this.appService.gotoPolicyDetail(this.portfolioData, this.pageTitle, this.investorName, item);
  }

}
