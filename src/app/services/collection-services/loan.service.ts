import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class  LoanService {
  getDetails(item){
    const portfolioData = [
      { title: 'CLIENT DETAILS', data: [] },
      { title: 'POLICY DETAILS', data: [] }
    ];
    return portfolioData;
  }
}
