/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
enum sipType {
  SIP = 'SIP',
  LUMPSUM = 'Lump Sum',
  LUMPSUMSIP = 'Lump Sum + SIP'
}
@Component({
  selector: 'app-mutual-fund-card',
  templateUrl: './mutual-fund-card.component.html',
  styleUrls: ['./mutual-fund-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MutualFundCardComponent implements OnInit {
  @Input() data = [];
  @Input() title;
  sipType = sipType;
  constructor(private userService: UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this.data);
    this.data.forEach(element => {
      this.calculateFundValue(element);
    });
    console.log(this.title);
  }

  gotoDetail(item) {
    console.log(item);
  }

  calcCurrentReturn(item) {
    if ((item.modeOfInvestment === this.sipType.SIP ||
      item.modeOfInvestment === this.sipType.LUMPSUMSIP) && item.currentFundValue && item.currentInvestedValue) {
      item.currentReturn = Math.abs(((item.currentFundValue - item.currentInvestedValue) / item.currentInvestedValue) * 100).toFixed(4);
    }
    if (item.modeOfInvestment === this.sipType.LUMPSUM && item.currentFundValue && item.amountInvested) {
      item.currentReturn = Math.abs(((item.currentFundValue - item.amountInvested) / item.amountInvested) * 100).toFixed(4);
    }
  }

  async calculateFundValue(item): Promise<any> {
    if (item.currentUnits && item.currentNav) {
      item.currentFundValue = (item.currentUnits * await this.getCurrentNav(item)).toFixed(4);
      this.calcCurrentReturn(item);
    }
  }

  async getCurrentNav(item) {
    const result = await this.userService.fetchSelectedScheme(item.company.id);
    console.log(result);
    return result.nav;
  }
}
