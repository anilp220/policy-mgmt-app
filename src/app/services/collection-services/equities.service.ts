import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquitiesService {
  getDetails(item) {
    const portfolioData = [
      { title: 'Investor details', data: [] },
      { title: 'Investment details', data: [] },
    ];
    portfolioData[0].data = this.investorDetails(item);
    portfolioData[1].data = this.investmentDetails(item);
    return portfolioData;
  }

  investorDetails(item) {
    return [
      {
        key: 'INVESTOR NAME',
        value: item.investorName
      },
      {
        key: 'PAN NO.',
        value: item.panNo
      },
      {
        key: 'MOBILE NO.',
        value: item.mobile
      },
      {
        key: 'EMAIL ID',
        value: item.email
      },
      {
        key: 'KYC UPDATED',
        value: item.kycUpdated
      },
      {
        key: 'BANK DETAILS',
        value: item.bankDetails
      },
      {
        key: 'NOMINEE/HOLDER1',
        value: item.nomineeHolder
      },
      {
        key: 'BROKER',
        value: item.broker
      },
      {
        key: 'DEMAT ACCOUNT DETAILS',
        value: item.dematAccountDetails
      },
    ];
  }

  investmentDetails(item) {
    return [
      {
        key: 'NAME OF COMPANY',
        value: item.company?.identifier
      },
      {
        key: 'ISIN NO.',
        value: item.isinNo
      },
      {
        key: 'DATE OF PURCHASE',
        value: item.dateOfPurchase
      },
      {
        key: 'PURPOSE OF INVESMENT',
        value: item.purposeOfInvestment
      },
      {
        key: 'INVESTMENT TENURE',
        value: item.investmentTenure
      },
      {
        key: 'EXPECTED INVESTMENT RETURN',
        value: item.expectedInvestmentReturn
      },
      {
        key: 'INVESTED AMOUNT',
        value: item.amountInvested
      },
      {
        key: 'CURRENT SHARES',
        value: item.currentShares
      },
      {
        key: 'CURRENT SHARE PRICE',
        value: item.currentPrice
      },
      {
        key: 'CURRENT FUND VALUE',
        value: item.currentFundValue
      },
      {
        key: 'CURRENT RETURN',
        value: item.currentReturn
      },
      {
        key: 'EXPECTED MATURITY VALUE',
        value: item.maturityValue
      },
      {
        key: 'DATE OF MATURITY',
        value: item.dateOfMaturity
      },
    ];
  }
}
