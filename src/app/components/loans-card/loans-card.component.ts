import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { LoanService } from 'src/app/services/collection-services/loan.service';
import { Models } from 'src/app/services/models.service';

@Component({
  selector: 'app-loans-card',
  templateUrl: './loans-card.component.html',
  styleUrls: ['./loans-card.component.scss'],
})
export class LoansCardComponent implements OnInit {
  @Input() data = [];
  @Input() investorName;
  @Input() pageTitle;
  tableTitle = [];
  tableData = {
    item: null,
    data: []
  };
  constructor(private models: Models, private liService: LoanService, public appService: AppService) {
  }

  ngOnInit() {
    this.buildGenericeTableData();
    // this.investorName = "DEMO";
  }

  buildGenericeTableData() {
    // const item = { ...this.data[0] };
    this.tableTitle = [
      ['MONEY LENDER NAME', 'LOAN ACCOUNT NO.'],
      ['LOAN TYPE', 'LOAN AMOUNT'],
      ['DATE OF LOAN DISBURSAL', 'LOAN REPAYMENT TENURE'],
      ['RATE OF INTEREST', 'INTEREST TYPE'],
      ['EMI AMOUNT', 'EMI DATE']
    ];
    this.data.forEach(item => {
      this.tableData.item = item;
      this.tableData.data.push([
        [item.moneyLenderName, item.loanAccountNumber],
        [item.loanType, item.loanAmount],
        [item.dateOfLoanDisbursal, item.loanRepaymentTenure],
        [item.roi, item.interestType],
        [item.monthlyEmiAmount, item.emiDate]
      ]);
    });
  }
  gotoDetail(item) {
    const data = this.liService.getDetails(item);
    this.appService.gotoPolicyDetail(data, this.pageTitle, this.investorName, item);
  }
}
