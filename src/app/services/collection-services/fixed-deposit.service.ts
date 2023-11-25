import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FixedDepositService {

  getDetails(item){
    const portfolioData = [
      { title: item.typeOfPolicy, data: [] },
    ];
    portfolioData[0].data = this.policytDetails(item);
    return portfolioData;
  }

  policytDetails(item) {
    return [
      {
        key: 'NAME OF 1ST HOLDER',
        value: item.firstholder
      },
      {
        key: 'ACCOUNT HOLDER D.O.B',
        value: item.dobAccountHolder
      },
      {
        key: 'NAME OF 2ND HOLDER',
        value: this.getHolderName(item.secondHolders, 0),
      },
      {
        key: 'NAME OF 3RD HOLDER',
        value: this.getHolderName(item.secondHolders, 1),
      },
      {
        key: 'NOMINEE NAME',
        value: item.nomineeName
      },
      {
        key: 'NOMINEE D.O.B',
        value: item.nomineeNameDob
      },
      {
        key: 'ACCOUNT HOLDER BANK DETAILS',
        value: item.accountHolderBankDetail
      },
      {
        key: 'INVESTMENT DETAILS',
        value: this.getInvestmentDetail(item),
      },
      {
        key: 'MONEY BACK DETAILS',
        value: this.getMoneyBackDetail(item)
      },
      {
        key: 'MATURITY DETAILS',
        value: this.getMaturityDetails(item),
      },
      {
        key: 'RETURN ON INVESTMENT',
        value: item.returnOnInvestment + '%'
      },
      {
        key: 'TAX BENEFIT',
        value: item.taxBenefit
      },
      {
        key: 'TAX ON MATURITY',
        value: item.taxOnMaturity
      },
      {
        key: 'STATUS',
        value: item.status
      },
    ];
  }

  getHolderName(holders: any[], index: number) {
    return holders[index]?.name || 'NA';
  }

  getInvestmentDetail(item) {
    return [];
  }

  getMoneyBackDetail(item) {
    return [];
  }

  getMaturityDetails(item) {
    return [];
  }

}
