/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SipType } from 'src/app/enums/sip-type-enum';
import { AppService } from 'src/app/services/app.service';
import { MutualFundService } from 'src/app/services/collection-services/mutual-fund.service';
import { Models } from 'src/app/services/models.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mutual-fund-card',
  templateUrl: './mutual-fund-card.component.html',
  styleUrls: ['./mutual-fund-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MutualFundCardComponent implements OnInit {
  @Input() data = [];
  @Input() investorName;
  @Input() pageTitle;
  sipType = SipType;

  tableTitle = [];
  tableData = {
    item: null,
    data: []
  };

  constructor(private userService: UserService,
    private appService: AppService,
    private mfService: MutualFundService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.buildGenericeTableData();
  }

  async buildGenericeTableData() {
    this.tableTitle = [
      ['COMPANY'],
      ['D.O.P.'],
      ['INVESTED VALUE'],
      ['FUND VALUE'],
      ['RETURN']
    ];
    for (const item of this.data) {
      await this.calculateFundValue(item);
      this.tableData.item = item;
      this.tableData.data.push([
        [item.company?.name],
        [item.dateOfPurchase],
        [item.currentInvestedValue],
        [item.currentFundValue],
        [item.currentReturn + '%']
      ]);
    }
    this.cdr.detectChanges();
    await this.appService.hideLoading();
  }

  gotoDetail(item) {
    const data = this.mfService.getDetails(item);
    this.appService.gotoPolicyDetail(data, this.pageTitle, this.investorName, item);
  }

  calcCurrentReturn(item) {
    if ((item.modeOfInvestment === this.sipType.SIP ||
      item.modeOfInvestment === this.sipType.LUMPSUMSIP) && item.currentFundValue && item.currentInvestedValue) {
      item.currentReturn = Math.abs(((item.currentFundValue - item.currentInvestedValue) / item.currentInvestedValue) * 100).toFixed(4);
    }
    if (item.modeOfInvestment === this.sipType.LUMPSUM && item.currentFundValue && item.amountInvested) {
      item.currentReturn = Math.abs(((item.currentFundValue - item.amountInvested) / item.amountInvested) * 100).toFixed(4);
    }
    this.cdr.detectChanges();
  }

  async calculateFundValue(item): Promise<any> {
    if (item.currentUnits && item.currentNav) {
      item.currentFundValue = (item.currentUnits * await this.getCurrentNav(item)).toFixed(4);
      this.calcCurrentReturn(item);
    }
  }

  async getCurrentNav(item) {
    const result = await this.userService.fetchSelectedScheme(item.company.id);
    return result.nav;
  }
}
