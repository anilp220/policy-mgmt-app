import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
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
  constructor(private userService: UserService,
    public appService: AppService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this.data);
    this.data.forEach(element => {
      element.currentReturn = 0;
      element.currentFundValue = 0;
      element.currentSharePrice = 0;
      this.getCurrentSharePrice(element);
    });
    console.log(this.investorName);
  }

  calcCurrentReturn(item) {
    item.currentReturn = (((item.currentFundValue - item.amountInvested) / item.amountInvested) * 100).toFixed(2);
    this.cdr.detectChanges();
  }

  async getCurrentSharePrice(item) {
    const result = await this.userService.fetchRapidApi(item.company.identifier);
    await this.appService.hideLoading();
    if (result && result.length) {
      item.currentSharePrice = result[0].lastPrice;
      this.calculateFundValue(item);
    }
  }

  calculateFundValue(item) {
    item.currentFundValue = item.currentShares * item.currentSharePrice;
    this.calcCurrentReturn(item);
  }
}

