import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { CorporateInsuranceService } from 'src/app/services/collection-services/corporate-insurance.service';

@Component({
  selector: 'app-corporate-insurance-card',
  templateUrl: './corporate-insurance-card.component.html',
  styleUrls: ['./corporate-insurance-card.component.scss'],
})
export class CorporateInsuranceCardComponent implements OnInit {
  @Input() data = [];
  @Input() investorName;
  @Input() pageTitle;

  tableTitle = [];
  tableData = {
    item: null,
    data: []
  };
  constructor(private appService: AppService, private corporateService: CorporateInsuranceService) { }

  ngOnInit() {
    this.buildGenericeTableData();
  }

  buildGenericeTableData() {
    this.tableTitle = [
      ['INSURANCE COMPANY'],
      ['D.O.P.', 'POLICY PERIOD'],
      ['COVERAGE'],
      ['PREMIUM'],
      ['POLICY STATUS']
    ];
    console.log(this.data);
    this.data.forEach(item => {
      this.tableData.item = item;
      this.tableData.data.push([
        [item.insuranceCompanyName],
        [item.purchaseDate, item.policyPeriod],
        [item[this.getTypeOfPolicyAsKey(item.typeOfPolicy)]?.policyCoverage?.coverage],
        [item.premium],
        [item.statusOfPolicy],
      ]);
    });
    console.log(this.tableData);
  }

  getTypeOfPolicyAsKey(str) {
    if (str) {
      const arr = str.toLowerCase().split(' ');
      let result = '';
      for (let i = 0; i < arr.length; i++) {
        let temp = arr[i];
        if (i > 0) {
          temp = temp[0].toUpperCase() + temp.slice(1);
        }
        result += temp;
      }
      return result;
    }
  }

  gotoDetail(item) {
    const data = this.corporateService.getDetails(item);
    this.appService.gotoPolicyDetail(data, this.pageTitle, this.investorName, item);
  }

}
