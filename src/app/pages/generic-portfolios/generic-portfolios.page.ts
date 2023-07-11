/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';
enum sipType {
  SIP = 'SIP',
  LUMPSUM = 'Lump Sum',
  LUMPSUMSIP = 'Lump Sum + SIP'
}
@Component({
  selector: 'app-generic-portfolios',
  templateUrl: './generic-portfolios.page.html',
  styleUrls: ['./generic-portfolios.page.scss'],
})
export class GenericPortfoliosPage implements OnInit {
  policyType;
  pageIndex;
  pageTitle;
  items = [];
  error;
  sipType = sipType;
  portfolios = {
    'life-insurance': [
      {
        name: 'Term',
      },
      {
        name: 'Return of Premium - Term',
      },
      {
        name: 'Unit Linked',
      },
      {
        name: 'Traditional Participating',
      },
      {
        name: 'Non Participating',
      }
    ],
    mediclaim: [
      { name: 'Mediclaim Base Plan' },
      { name: 'Top-Up Plan' },
      { name: 'Accidental Plan' },
      { name: 'Critical Illness Plan' },
      { name: 'Cancer Plan' },
    ],
    'vehicle-insurance': [
      { name: 'Private' },
      { name: 'Commercial' }
    ],
    'corporate-insurance': [
      { name: 'Workman Compensation' },
      { name: 'Group Mediclaim' },
      { name: 'Contractor All Risk Policy' },
      { name: 'Merchants Cover Policy' },
      { name: 'Shop Insurance' },
      { name: 'Marine Open Inland Declaration Policy' },
      { name: 'Contractors Plant & Machinery Insurance Policy' },
      { name: 'Building Insurance' }
    ],
    others: [
      { name: 'Government Bonds' },
      { name: 'Private Bonds' },
      { name: 'Gold Bonds' },
      { name: 'Government Scheme' },
      { name: 'Post Office' },
      { name: 'Bank Fixed Deposit' },
      { name: 'Private Fixed  Deposit' },
    ]
  };
  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private appService: AppService,
    public navCtrl: NavController) {

  }

  next() {
    const index = this.portfolios[this.pageTitle].findIndex(port => port.name === this.policyType);
    // eslint-disable-next-line max-len
    this.navCtrl.navigateForward('/generic-portfolios/' + this.pageTitle + '/' + this.portfolios[this.pageTitle][index + 1].name + '/' + (index + 1));
  }

  // getData(collection) {
  //   console.log(collection);
  //   this.userService.getDocument(collection, 'asdasd')
  //     .then((res) => {
  //       console.log(res);
  //       if (res.empty) {
  //         this.error = 'No Data Found';
  //       }
  //       res.docs.forEach(result => {
  //         console.log('data', result.data());
  //         this.items.push(result.data());
  //       });
  //     });
  // }

  ionViewDidEnter() {
    this.activatedRoute.params.subscribe(res => {
      this.policyType = res.page;
      this.pageIndex = res.index;
      this.pageTitle = res.title;
      console.log(this.policyType);
      console.log(this.pageIndex);
      console.log(this.pageTitle);
      console.log(this.items);
      this.getData();
    });
  }

  ngOnInit() {

  }

  async getData() {
    this.items = this.appService.getPolicies(this.policyType);
    console.log(this.items);
    if (this.pageTitle === 'mutual-fund') {
      for (const key in this.items) {
        if (Object.prototype.hasOwnProperty.call(this.items, key)) {
          const element = this.items[key];
          await this.getCurrentNav(element);
        }
      }
    }
    if (!this.items.length) {
      this.error = 'No Data Found';
    }
    return;
  }

  async getCurrentNav(item) {
    const result = await this.userService.fetchSelectedScheme(item.company.id);
    console.log(result);
    item.currentNav = result.nav;
    this.calculateFundValue(item);
  }

  calculateFundValue(item) {
    if (item.currentUnits && item.currentNav) {
      item.currentFundValue = (item.currentUnits * item.currentNav).toFixed(4);
      this.calcCurrentReturn(item);
    }
  }

  calcCurrentReturn(item) {
    if ((item.modeOfInvestment === this.sipType.SIP
      || item.modeOfInvestment === this.sipType.LUMPSUMSIP)
      && item.currentFundValue && item.currentInvestedValue) {
      item.currentReturn = Math.abs(((item.currentFundValue - item.currentInvestedValue) / item.currentInvestedValue) * 100).toFixed(4);
    }
    if (item.modeOfInvestment === this.sipType.LUMPSUM
      && item.currentFundValue && item.amountInvested) {
      item.currentReturn = Math.abs(((item.currentFundValue - item.amountInvested) / item.amountInvested) * 100).toFixed(4);
    }
  }

  gotoDetail(item) {
    console.log(item);
    console.log(this.policyType);
    this.appService.setData(item);
    this.navCtrl.navigateForward('/tabs/policy-detail/' + this.policyType + '/' + this.pageTitle);
  }

  async doRefresh(event) {
    await this.appService.presentLoading('Refreshing...');
    await this.getData();
    await this.appService.hideLoading();
    event.target.complete();
  }
}
