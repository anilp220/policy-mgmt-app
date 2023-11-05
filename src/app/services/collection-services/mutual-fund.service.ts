import { Injectable } from '@angular/core';
import { SipType } from 'src/app/enums/sip-type-enum';

@Injectable({
  providedIn: 'root'
})
export class MutualFundService {

  getDetails(item){
    console.log(item);
    const portfolioData = [
      { title: 'INVESTOR DETAILS', data: [] },
      { title: 'INVESTMENT DETAIL', data: [] },
      { title: 'FUTURE VALUES OF INVESTMENT', data: [] },
      { title: 'RETURN PERFORMANCE', data: [] }
    ];
    portfolioData[0].data = this.investorDetail(item);
    portfolioData[1].data = this.investmentDetail(item);
    portfolioData[2].data = this.futureValues(item);
    portfolioData[3].data = this.returnPerformance(item);
    return portfolioData;
  }
  investorDetail(item) {
    const obj = [
      {
        key: 'Investor Name',
        value: item.investorName
      }, {
        key: 'Minor/Major',
        value: item.minorMajor
      }, {
        key: 'PAN No.',
        value: item.panNo
      }, {
        key: 'Mobile No.',
        value: item.mobile
      }, {
        key: 'Email ID',
        value: item.email
      }, {
        key: 'Kyc Updated',
        value: item.kycUpdated
      }, {
        key: 'Bank Details',
        value: item.bankDetails
      }, {
        key: 'Life Type',
        value: item.lifeType
      }, {
        key: 'Nominee Holder 1',
        value: item.nomineeHolder
      },
    ];
    return obj;
  }

  investmentDetail(item) {
    const obj = [
      {
        key: 'Company Name',
        value: item.company?.name?.split('-')[0]
      },
      {
        key: 'Fund Category',
        value: item.fundCategory
      },
      {
        key: 'Fund Type',
        value: item.fundType
      },
      {
        key: 'Folio No.',
        value: item.folioNo
      },
      {
        key: 'Plan Name',
        value: item.planName
      },
      {
        key: 'Options',
        value: item.option
      },
      {
        key: 'Tax Saver ',
        value: item.taxSaver
      },
      {
        key: 'Purchase Details',
        value: this.purchaseDetails(item)
      },
      {
        key: 'Agent/Broker',
        value: item.agent
      },
    ];
    return obj;
  }

  purchaseDetails(item) {
    return [
      {
        key: 'Date of Purchase',
        value: item.dateOfPurchase
      },
      {
        key: 'Mode of Investment',
        value: item.modeOfInvestment
      },
      {
        key: 'Status',
        value: item.status
      },
      {
        key: 'Lump Sum Invested Amount',
        value: item.modeOfInvestment === SipType.LUMPSUMSIP ? item.lumpSumSIPamountInvested : 'NA'
      },
      {
        key: 'SIP Amount',
        value: item.modeOfInvestment !== SipType.LUMPSUM ? item.amountInvested : 'NA'
      },
      {
        key: 'SIP Date',
        value: item.modeOfInvestment !== SipType.LUMPSUM ? item.sipDate : 'NA'
      },
      {
        key: 'Annual SIP Invesment',
        value: item.modeOfInvestment !== SipType.LUMPSUM ? item.annualSIPInvestment : 'NA'
      },
      {
        key: 'Current Units',
        value: item.currentUnits
      },
      {
        key: 'Current Nav',
        value: item.currentNav
      },
      {
        key: 'Current Invested Value',
        value: item.currentInvestedValue
      },
      {
        key: 'Current Fund Value',
        value: item.currentFundValue
      },
      {
        key: 'Current Return',
        value: item.currentReturn
      },
      {
        key: 'Tax Benefit',
        value: item.taxBenefit
      },
    ];
  }

  futureValues(item) {
    const obj = [
      {
        key: 'Purpose of Invesment',
        value: item.purposeOfInvestment
      },
      {
        key: 'Term of Investment (Months)',
        value: item.termOfInvestment
      },
      {
        key: 'Total Investment in tenure',
        value: item.totalInvestment
      },
      {
        key: 'Expected Return in Tenure(%)',
        value: item.expectedReturn + '%'
      },
      {
        key: 'Expected Fund Value',
        value: item.expectedFundValue
      },
      {
        key: 'Maturity',
        value: item.maturity
      },
    ];
    return obj;
  }

  returnPerformance(item) {
    const obj = [
      {
        key: 'RETURN PERFORMANCE SINCE INCEPTION',
        value: item.returnPerformance
      }
    ];
    return obj;
  }
}
