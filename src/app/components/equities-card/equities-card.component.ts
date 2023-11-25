/* eslint-disable @typescript-eslint/prefer-for-of */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EquitiesService } from 'src/app/services/collection-services/equities.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-equities-card',
  templateUrl: './equities-card.component.html',
  styleUrls: ['./equities-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquitiesCardComponent implements OnInit {
  @Input() data = [];
  @Input() investorName;
  @Input() pageTitle;
  tableTitle = [];
  tableData = {
    item: null,
    data: []
  };
  constructor(private userService: UserService,
    public appService: AppService,
    private equityService: EquitiesService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this.data);
    console.log(this.investorName);
    this.buildGenericeTableData();
  }

  calcCurrentReturn(item) {
    item.currentReturn = (((item.currentFundValue - item.amountInvested) / item.amountInvested) * 100).toFixed(2);
    console.log(item.currentReturn);
    return item.currentReturn;
  }

  async getCurrentSharePrice(item) {
    const result = await this.userService.fetchRapidApi(item.company.identifier);
    console.log(result);
    await this.appService.hideLoading();
    if (result && result.length) {
      return result[0].lastPrice;
      // this.calculateFundValue(item);
    }else {return 0;}
  }

  calculateFundValue(item, currentPrice) {
    item.currentFundValue = item.currentShares * currentPrice;
    return item.currentFundValue;
  }

  async buildGenericeTableData() {
    console.log(this.data);
    this.tableTitle = [
      ['COMPANY'],
      ['D.O.P'],
      ['Invested Value'],
      ['Fund Value'],
      ['RETURN']
    ];
    this.tableData.data = [];
    for (let i = 0; i < this.data.length; i++) {
      const item = this.data[i];
      item.currentPrice = await this.getCurrentSharePrice(this.data[i]);
      console.log(item.currentPrice);
      this.tableData.item = item;
      this.tableData.data.push([
        [item.company?.symbol],
        [item.dateOfPurchase],
        [item.amountInvested],
        [this.calculateFundValue(item, item.currentPrice)],
        [this.calcCurrentReturn(item) + '%'],
      ]);
      this.cdr.detectChanges();
    }
    console.log(this.tableData);
  }

  gotoDetail(item){
    const data = this.equityService.getDetails(item);
    this.appService.gotoPolicyDetail(data, this.pageTitle, this.investorName, item);
  }
}

