/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
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
  portfolioData = [
    { title: 'CLIENT DETAILS', data: [] },
    { title: 'POLICY DETAILS', data: [] }
  ];
  tableTitle = [];
  tableData = {
    item: null,
    data: []
  };
  constructor(private models: Models, public appService: AppService) {
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
        [item.mode, item.premium],
        [item.sumAssured],
        [item.currentStatus]
      ]);
    });
    console.log(this.tableData);
    // this.tableData = [
    //   [item.company, item.plan],
    //   [item.policyNo, item.doc],
    //   [item.mode, item.premium],
    //   [item.sumAssured],
    //   [item.currentStatus]
    // ];
  }

  gotoDetail(item) {
    console.log(item);
    this.portfolioData[0].data = this.clientDetails(item);
    this.portfolioData[1].data = this.policytDetails(item);
    this.appService.gotoPolicyDetail(this.portfolioData, this.pageTitle, this.investorName);
  }

  clientDetails(item) {
    const obj = [
      {
        key: 'Proposer Name',
        value: item.proposerName
      },
      {
        key: 'DOB Proposer',
        value: item.proposerDOB
      },
      {
        key: 'Same as Proposer',
        value: item.SameAsProposer
      },
      {
        key: 'Name Of Life Insured',
        value: item.nameOfLifeInsured
      },
      {
        key: 'DOB Of life Insured',
        value: item.dobOfLifeInsured
      },
      {
        key: 'Nominee',
        value: item.nominee
      },
      {
        key: 'Nominee DOB',
        value: item.nomineeDOB
      },
      {
        key: 'Nomination Percentage',
        value: item.nomineePercent
      },
      {
        key: 'Assignee Details',
        value: this.getAssigneeDetails(item)
      },
      {
        key: 'Appointee Details',
        value: this.getAppointeeDetails(item)
      }
    ];
    return obj;
  }

  policytDetails(item) {
    return [
      {
        key: 'Type of Policy',
        value: item.typeOfPolicy
      },
      {
        key: 'Purpose Of Investment',
        value: item.purposeOfInvestment
      },
      {
        key: 'Policy Category',
        value: item.policyCategory
      },
      {
        key: 'Company',
        value: item.company
      },
      {
        key: 'Plan',
        value: item.plan
      },
      {
        key: 'Policy no.',
        value: item.policyNo
      },
      {
        key: 'Plan Features',
        value: item.planFeature
      },
      {
        key: 'DOC',
        value: item.doc
      },
      {
        key: 'Age At Commencement',
        value: item.ageAtCommencement
      },
      {
        key: 'Modal Premium',
        value: item.modalPremium
      },
      {
        key: 'Mode',
        value: item.mode
      },
      {
        key: 'Annual Premium',
        value: item.annualPremium
      },
      {
        key: 'Policy Term',
        value: item.policyTerm
      },
      {
        key: 'Premium Pay Term',
        value: item.premiumPayTerm
      },
      {
        key: 'Current Investment',
        value: item.currentInvestment
      },
      {
        key: 'Total Investment',
        value: item.totalInvestment
      },
      {
        key: 'Current Status',
        value: item.currentStatus
      },
      {
        key: 'Better Half Details',
        value: this.getBetterHalfDetails(item)
      },
      {
        key: 'COVERAGE DETAILS',
        value: this.getCoverageDetails(item)
      },
      {
        key: 'PREMIUM PAYING DETAILS',
        value: this.getPremiumPayingDetails(item)
      },
      {
        key: 'MATURITY DETAILS',
        value: this.getMaturityDetails(item)
      },
      {
        key: 'TAX DETAILS',
        value: this.getTaxDetails(item)
      },
    ];
  }

  getAssigneeDetails(item) {
    console.log(item);
    return [
      {
        key: 'Assignee Name',
        value: item.asignee?.name || 'NA'
      },
      {
        key: 'Date of Assignment',
        value: item.asignee?.asigneedate || 'NA'
      }
    ];
  }
  getAppointeeDetails(item) {
    return [
      {
        key: 'Appointee Name',
        value: item.appointee?.name || 'NA'
      },
      {
        key: 'Appointee DOB ',
        value: item.appointee?.dob || 'NA'
      }
    ];
  }
  getBetterHalfDetails(item) {
    return [
      {
        key: 'Better Half Benefit',
        value: item.betterHalf?.benefit
      },
      {
        key: 'Better Half Name',
        value: item.betterHalf?.name
      },
      {
        key: 'Better Half Sum Assured',
        value: item.betterHalf?.sumAssured
      },
    ];
  }
  getCoverageDetails(item) {
    //todo
    return [
    ];
  }
  getPremiumPayingDetails(item) {
    return [
      {
        key: 'Paid Till Date',
        value: item.paidTillDate
      },
      {
        key: 'Renewal Date',
        value: item.renewalDate
      },
      {
        key: 'Last Premium Pay year',
        value: item.lastPremiumPayYear
      },
      {
        key: 'End of Policy Term',
        value: item.endOfPolicyTerm
      },
    ];
  }
  getMaturityDetails(item) {
    return [
      {
        key: 'Maturity Benefit',
        value: item.maturityBenefit
      },
      {
        key: 'Date Of Maturity',
        value: item.dateOfMaturity
      },
      {
        key: 'Maturity Value',
        value: item.maturityValue
      },
      {
        key: 'LI Age at Maturity',
        value: item.LIAgeAtMaturity
      },
    ];
  }
  getTaxDetails(item) {
    return [
      {
        key: 'Tax section(80(c))',
        value: item.taxSection
      }, {
        key: 'Tax on claim',
        value: item.taxOnClaim
      }
    ];
  }
}
