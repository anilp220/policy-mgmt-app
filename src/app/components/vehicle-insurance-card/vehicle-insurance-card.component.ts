import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { VehicleInsuranceService } from 'src/app/services/collection-services/vehicleInsurance.service';

@Component({
  selector: 'app-vehicle-insurance-card',
  templateUrl: './vehicle-insurance-card.component.html',
  styleUrls: ['./vehicle-insurance-card.component.scss'],
})
export class VehicleInsuranceCardComponent implements OnInit {
  @Input() data = [];
  @Input() investorName;
  @Input() pageTitle;
  tableTitle = [];
  tableData = {
    item: null,
    data: []
  };

  constructor(private appService: AppService, private viService: VehicleInsuranceService) { }

  ngOnInit() {
    console.log(this.data);
    this.buildGenericeTableData();
  }

  buildGenericeTableData() {
    this.tableTitle = [
      ['REGISTRATION NUMBER'],
      ['INSURANCE COMPANY NAME'],
      ['PURCHASE DATE'],
      ['PREMIUM'],
      ['POLICY STATUS']
    ];
    this.data.forEach(item => {
      this.tableData.item = item;
      this.tableData.data.push([
        [item.registrationNumber],
        [item.insuranceCompany],
        [item.purchaseDate],
        [item.premium],
        [item.statusOfPolicy]
      ]);
    });
  }

  gotoDetail(item) {
    const data = this.viService.getDetails(item);
    this.appService.gotoPolicyDetail(data, this.pageTitle, this.investorName, item);
  }
}

