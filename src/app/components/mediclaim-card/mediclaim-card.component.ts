import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { HealthInsuranceService } from 'src/app/services/collection-services/health-insurance.service';
@Component({
  selector: 'app-mediclaim-card',
  templateUrl: './mediclaim-card.component.html',
  styleUrls: ['./mediclaim-card.component.scss'],
})
export class MediclaimCardComponent implements OnInit {
  @Input() data = [];
  @Input() investorName;
  @Input() pageTitle;
  portfolioData = [
    { title: 'POLICY DETAILS', data: [] }
  ];
  tableTitle = [];
  tableData = {
    item: null,
    data: []
  };
  constructor(private appService: AppService,private hiService: HealthInsuranceService) { }

  ngOnInit() {
    this.buildGenericeTableData();
  }

  gotoDetail(item) {
    console.log(item);
    this.portfolioData[0].data = this.hiService.policytDetails(item);
    this.appService.gotoPolicyDetail(this.portfolioData, this.pageTitle, this.investorName, item);
  }

  buildGenericeTableData() {
    this.tableTitle = [
      ['PROPOSER', 'TYPE'],
      ['COMPANY', 'PLAN'],
      ['D.O.P.', 'POLICY PERIOD'],
      ['PREMIUM'],
      ['POLICY STATUS']
    ];
    this.data.forEach(item => {
      this.tableData.item = item;
      this.tableData.data.push([
        [item.proposer, item.type],
        [item.company, item.plan],
        [item.purchaseDate, item.policyPeriod],
        [item.premium],
        [item.statusOfPolicy]
      ]);
    });
    console.log(this.tableData);
  }
}
