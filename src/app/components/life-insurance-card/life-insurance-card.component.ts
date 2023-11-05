/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { LifeInsuranceService } from 'src/app/services/collection-services/life-insurance.service';
import { Models } from 'src/app/services/models.service';

@Component({
  selector: 'app-life-insurance-card',
  templateUrl: './life-insurance-card.component.html',
  styleUrls: ['./life-insurance-card.component.scss'],
})
export class LifeInsuranceCardComponent implements OnInit {
  @Input() data = [];
  @Input() investorName;
  @Input() pageTitle;
  tableTitle = [];
  tableData = {
    item: null,
    data: []
  };
  constructor(private models: Models, private liService: LifeInsuranceService, public appService: AppService) {
  }

  ngOnInit() {
    console.log(this.data);
    this.buildGenericeTableData();
  }

  buildGenericeTableData() {
    // const item = { ...this.data[0] };
    this.tableTitle = [
      ['COMPANY', 'PLAN'],
      ['POLICY NO', 'D.O.C.'],
      ['MODE', 'PREMIUM'],
      ['SUM ASSURED'],
      ['STATUS']
    ];
    this.data.forEach(item => {
      this.tableData.item = item;
      this.tableData.data.push([
        [item.company, item.plan],
        [item.policyNo, item.doc],
        [item.mode, item.modalPremium],
        [item.sumAssured],
        [item.currentStatus]
      ]);
    });
    console.log(this.tableData);
  }
  gotoDetail(item) {
    const data = this.liService.getDetails(item);
    this.appService.gotoPolicyDetail(data, this.pageTitle, this.investorName, item);
  }
}
