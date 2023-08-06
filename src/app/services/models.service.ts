import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Models {
  collections = {
    lifeInsurance: 'life-insurance',
    mediclaim: 'mediclaim',
    mutualFund: 'mutual-fund',
    equities: 'equities',
    vehicleInsurance: 'vehicle-insurance',
    corporateInsurance: 'corporate-insurance',
    others: 'others',
  };

  titles = {
    lifeInsurance: 'Life Insurance',
    mediclaim: 'Mediclaim',
    mutualFund: 'Mutual Fund',
    equities: 'Equities',
    vehicleInsurance: 'Vehicle Insurance',
    corporateInsurance: 'Corporate Insurance',
    others: 'Others',
  };
}
