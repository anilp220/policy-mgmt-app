/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  pages = {
    LifeInsurance: 'Life Insurance',
    Medicare: 'Medicare',
    MutualFund: 'Mutual Fund',
    VehicleInsurance: 'Vehicle Insurance',
    Equity: 'Equity',
    BondDebenture: 'Bond Debenture',
  };
  constructor() { }

}
