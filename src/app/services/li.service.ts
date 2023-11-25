import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LiService {
  getDetails(item) {
    const portfolioData = [
      { title: 'CLIENT DETAILS', data: [] },
      { title: 'POLICY DETAILS', data: [] }
    ];
    portfolioData[0].data = this.clientDetails(item);
    portfolioData[1].data = this.policytDetails(item);
    return portfolioData;
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
    console.log(item);
    const obj = [
      {
        key: 'SUM ASSURED',
        value: item.sumAssured
      },
      {
        key: 'DEATH BENEFIT',
        value: item.deathBenefit
      },
      {
        key: 'Death Benefit Value',
        value: item.deathBenefitValue
      },
    ];
    for (let i = 0; i < item.riders?.length; i++) {
      const rider = item.riders[i];
      const riderObj = {
        key: 'Rider ' + (i + 1),
        value: [
          {
            key: 'RIDER NAME',
            value: rider.riderName
          },
          {
            key: 'SUM',
            value: rider.sumAssured
          },
          {
            key: 'RIDER VALIDITY',
            value: rider.riderValidity
          },
          {
            key: 'FEATURE',
            value: rider.features
          }
        ],
        labelName: rider.riderName,
        coverages: []
      };
      for (let j = 0; j < rider.coverages?.length; j++) {
        const coverages = rider.coverages[j];
        riderObj.coverages.push({
          disease: coverages.disease,
          diseaseOverview: coverages.diseaseOverview,
          sumAssured: coverages.sumAssured
        });
      }
      obj.push(riderObj);
    }
    console.log(obj);
    return obj;
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
