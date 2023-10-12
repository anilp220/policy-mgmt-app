import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-corporate-insurance-card',
  templateUrl: './corporate-insurance-card.component.html',
  styleUrls: ['./corporate-insurance-card.component.scss'],
})
export class CorporateInsuranceCardComponent implements OnInit {
  @Input() data = [];
  @Input() investorName;
  @Input() pageTitle;
  portfolioData = [
    { title: 'CLIENT DETAILS', data: [] },
    { title: 'POLICY DETAILS', data: [] }
  ];
  tableTitle = [];
  tableData = {
    item: null,
    data: []
  };
  constructor(private appService: AppService) { }

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

  gotoDetail(item) {
    console.log(item);
    this.portfolioData[0].data = this.policytDetails(item);
    this.appService.gotoPolicyDetail(this.portfolioData, this.pageTitle, this.investorName, item);
  }

  policytDetails(item) {
    return [
      {
        key: 'FIRST COVERAGE INCEPTION DATE',
        value: item.coverageInceptionDate
      },
      {
        key: 'PROPOSER',
        value: item.proposer
      },
      {
        key: 'COMPANY',
        value: item.company
      },
      {
        key: 'PLAN',
        value: item.plan
      },
      {
        key: 'POLICY NUMBER',
        value: item.policyNumber
      },
      {
        key: 'PURCHASE DATE',
        value: item.purchaseDate
      },
      {
        key: 'POLICY PERIOD',
        value: item.policyPeriod
      },
      {
        key: 'PREMIUM',
        value: item.premium
      },
      {
        key: 'NOMINEE',
        value: item.nominee
      },
      {
        key: 'DEDUCTIBLE SUM ASSURED',
        value: item.deductibleSumAssured
      },
      {
        key: 'RENEWAL DATE',
        value: item.renewalDate
      },
      {
        key: 'POLICY STATUS',
        value: item.statusOfPolicy
      },
      {
        key: 'INSURED MEMBER  DETAILS',
        value: this.insuredMemberDetail(item[item.coverageType].insuredMemberDetail),
        isAccordian: true
      },
      {
        key: 'POLICY LOADING',
        value: this.policyLoading(item)
      },
      {
        key: 'DISEASE UPDATION',
        value: this.diseaseUpdation(item)
      },
      {
        key: 'TAX SECTION',
        value: item.taxSection
      },
      {
        key: 'AGENT NAME',
        value: item.agentName
      },
    ];
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
      console.log(result);
      return result;
    }
  }

  insuredMemberDetail(item: any[]) {
    const arr = [];
    item.forEach(ele => {
      const obj = {
        title: ele.memberInsured,
        data: [
          {
            key: 'DOB',
            value: ele.dob
          },
          {
            key: 'GENDER',
            value: ele.dob
          },
          {
            key: 'RELATION',
            value: ele.relation
          },
          {
            key: 'SUM ASSURED',
            value: ele.sumAssured
          },
          {
            key: 'NO CLAIM BONUS',
            value: ele.noClaimBonus
          },
          {
            key: 'NCB SUM ASSURED',
            value: ele.ncbSumAssured
          },
          {
            key: 'ANY OTHER BONUS',
            value: ele.otherBonus
          },
          {
            key: 'HEALTH CHECK UP AMOUNT/LINK',
            value: ele.healthCheckup?.amount
          },
          {
            key: 'HEALTH CHECK UP WAITING PERIOD',
            value: ele.healthCheckup?.waiting
          },
          {
            key: 'HEALTH CHECK UP WAITING DUE DATE',
            value: ele.healthCheckup?.dueDate
          }
        ]
      };
      arr.push(obj);
    });
    return arr;
  }

  diseaseUpdation(item) {
    return [
      {
        key: 'MEMBER NAME',
        value: item.proposer
      },
      {
        key: 'REASON FOR LOADING',
        value: item.policyLoading?.reason
      },
      {
        key: 'COVERAGE WAITING PERIOD',
        value: item.policyLoading?.waiting
      },
      {
        key: 'LOADING AMOUNT',
        value: item.policyLoading?.amount
      },
    ];
  }

  policyLoading(item) {
    return [
      {
        key: 'MEMBER NAME',
        value: item.policyLoading?.memberName
      },
      {
        key: 'REASON FOR LOADING',
        value: item.policyLoading?.reason
      },
      {
        key: 'COVERAGE WAITING PERIOD',
        value: item.policyLoading?.waiting
      },
      {
        key: 'LOADING AMOUNT',
        value: item.policyLoading?.amount
      },
    ];
  }

}
