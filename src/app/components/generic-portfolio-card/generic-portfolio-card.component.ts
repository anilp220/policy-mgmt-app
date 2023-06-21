import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-generic-portfolio-card',
  templateUrl: './generic-portfolio-card.component.html',
  styleUrls: ['./generic-portfolio-card.component.scss'],
})
export class GenericPortfolioCardComponent implements OnInit, AfterViewInit {
  @Input() item;
  @Input() page;
  @Input() cardIndex;
  title = '';
  constructor(private constService: ConstantsService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('item', this.item);
  }

  ngAfterViewInit() {
    this.setBarColor();
  }

  percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  }

  setBarColor() {
    const outerBar = document.getElementById('outer' + this.page.split(' ').join('') + this.cardIndex);
    const innerBar = document.getElementById('inner' + this.page.split(' ').join('') + this.cardIndex);
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const outerColor = randomColor + '70';
    innerBar.style.background = '#' + randomColor;
    outerBar.style.background = '#' + outerColor;
    this.setbarWidth(innerBar);
    // innerBar.style.width = this.percentage(this.item.totalInvestment, this.item.sumAssured) + '%';
  };

  setbarWidth(innerBar) {
    switch (this.page) {
      case this.constService.pages.LifeInsurance:
        innerBar.style.width = this.percentage(this.item.totalInvestment, this.item.sumAssured) + '%';
        this.title = this.item.company;
        break;
      case this.constService.pages.Medicare:
        innerBar.style.width = this.percentage(this.item.totalInvestment, this.item.sumAssured) + '%';
        break;
      case this.constService.pages.MutualFund:
        innerBar.style.width = this.percentage(this.item.totalInvestment, this.item.amountInvested) + '%';
        this.title = this.item.companyName;
        break;
      case this.constService.pages.VehicleInsurance:
        innerBar.style.width = this.percentage(this.item.totalInvestment, this.item.sumAssured) + '%';
        this.title = this.item.insuranceCompany;
        break;
      case this.constService.pages.Equity:
        innerBar.style.width = this.percentage(this.item.totalInvestment, this.item.sumAssured) + '%';
        break;
      case this.constService.pages.BondDebenture:
        innerBar.style.width = this.percentage(this.item.totalInvestment, this.item.sumAssured) + '%';
        break;
      default:
        break;
    }
    this.cdr.detectChanges();
  }

}
