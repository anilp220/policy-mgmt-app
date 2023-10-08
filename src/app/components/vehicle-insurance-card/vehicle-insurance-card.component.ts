import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

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
  portfolioData = [
    { title: 'VEHICLE DETAILS', data: [] },
    { title: 'POLICY DETAILS', data: [] }
  ];
  constructor(private appService: AppService) { }

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
    console.log(item);
    this.portfolioData[0].data = this.getVehicleDetails(item);
    this.portfolioData[1].data = this.getPolicyDetails(item);
    this.appService.gotoPolicyDetail(this.portfolioData, this.pageTitle, this.investorName, item);
  }

  getVehicleDetails(item) {
    return [
      {
        key: 'Name of Owner',
        value: item.nameOfOwner
      },
      {
        key: 'Registration Number',
        value: item.registrationNumber
      },
      {
        key: 'Model',
        value: item.vehicleSummary.model
      },
      {
        key: 'Variant',
        value: item.vehicleSummary.variant
      },
      {
        key: 'Type Of Body',
        value: item.vehicleSummary.typeOfBody
      },
      {
        key: 'Year Of Manufacture',
        value: item.vehicleSummary.yearOfManufacture
      },
      {
        key: 'Engine Number',
        value: item.vehicleSummary.engineNumber
      },
      {
        key: 'Chasis Number',
        value: item.vehicleSummary.chasisNumber
      },
      {
        key: 'Cubic Capacity',
        value: item.vehicleSummary.cubicCapacity
      },
      {
        key: 'Seating Capacity',
        value: item.vehicleSummary.seatingCapacity
      },
      {
        key: 'Fuel Type',
        value: item.vehicleSummary.fuelType
      },
      {
        key: 'Date of Registration of Vehicle',
        value: item.vehicleSummary.dateOfRegistration
      },
      {
        key: 'Geographical Area',
        value: item.vehicleSummary.geographicalArea
      },
      {
        key: 'Address in RC card',
        value: item.vehicleSummary.addressInRC
      }
    ];
  }

  getPolicyDetails(item) {
    return [
      {
        key: 'INSURANCE COMPANY NAME ',
        value: item.insuranceCompany
      },
      {
        key: 'GSTN NO. ',
        value: item.gstNo
      },
      {
        key: 'PURCHASE DATE ',
        value: item.purchaseDate
      },
      {
        key: 'POLICY PERIOD (1 , 1+3 , 3+3)YEAR ',
        value: item.policyPeriod
      },
      {
        key: 'POLICY NUMBER ',
        value: item.policyNumber
      },
      {
        key: 'CURRENT NCB ',
        value: item.currentNCB
      },
      {
        key: 'POLICY COVERAGES',
        value: item.policyCoverages
      },
      {
        key: 'IDV ',
        value: item.vehicleValue.IDV
      },
      {
        key: 'NON ELEC ACCESSORY ',
        value: item.vehicleValue.nonElec
      },
      {
        key: 'ELECTRICAL ACCESSORY ',
        value: item.vehicleValue.elec
      },
      {
        key: 'PREMIUM ',
        value: item.premium
      },
      {
        key: 'DEDUCTIBLE AMOUNT',
        value: item.deductibleAmount
      },
      // {
      //   key: 'POLICY STATUS',
      //   value: item.typeOfPolicy //we dont have this in form
      // },
      {
        key: 'RENEWAL DATE',
        value: item.renewalDate
      },
      {
        key: 'THIRD PARTY RENEWAL DATE',
        value: item.thirdPartyRenewalDate
      },
    ];
  }

  addUrls(item) {
    return [
      {
        name: 'BRANCH LOCATOR',
        url: item.branchLocator
      },
      {
        name: 'POLICY DOWLOAD',
        url: item.policyDownload
      },
      {
        name: 'Claim Procedure',
        url: item.claimProcedure
      }
    ];
  }
}

