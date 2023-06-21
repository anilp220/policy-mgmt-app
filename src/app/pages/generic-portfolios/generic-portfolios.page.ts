import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-generic-portfolios',
  templateUrl: './generic-portfolios.page.html',
  styleUrls: ['./generic-portfolios.page.scss'],
})
export class GenericPortfoliosPage implements OnInit {
  page;
  pageIndex;
  pageTitle;
  items = [];
  error;
  portfoliosInvestments = {
    portfolio: [
      {
        name: 'Life Insurance',
      },
      {
        name: 'Medicare',
      },
      {
        name: 'Mutual Fund',
      },
      {
        name: 'Vehicle Insurance',
      },
      {
        name: 'Equity',
      },
      {
        name: 'Bond Debenture',
      }
    ],
    investments: [
      {
        name: 'Annual Investments',
      },
      {
        name: 'Single Pay Investments',
      },
      {
        name: 'Premium Paid By Self',
      },
      {
        name: 'Premium Paid By Spouse',
      },
      {
        name: 'Premium Paid By Child',
      }
    ]
  };
  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private appService: AppService,
    public navCtrl: NavController) {

  }

  next() {
    const index = this.portfoliosInvestments[this.pageTitle].findIndex(port => port.name === this.page);
    // eslint-disable-next-line max-len
    this.navCtrl.navigateForward('/generic-portfolios/' + this.pageTitle + '/' + this.portfoliosInvestments[this.pageTitle][index + 1].name + '/' + (index + 1));
  }

  getData(collection) {
    console.log(collection);
    this.userService.getDocument(collection, 'asdasd')
      .then((res) => {
        console.log(res);
        if (res.empty) {
          this.error = 'No Data Found';
        }
        res.docs.forEach(result => {
          console.log('data', result.data());
          this.items.push(result.data());
        });
      });
  }

  ionViewWillEnter() {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.page = res.page;
      this.pageIndex = res.index;
      this.pageTitle = res.title;
      this.items = [];
      this.getData(this.page.split(' ').join('-').toLowerCase());
      console.log(res);
    });
    // this.items = [
    //   {
    //     title: 'Axis Mutual fund',
    //     currentNav: 3.4,
    //     investment: 34525,
    //     units: 234234,
    //     valuation: 3524,
    //     cagr: 5.4
    //   }, {
    //     title: 'Kotak Low duration',
    //     currentNav: 4.2,
    //     investment: 5235,
    //     units: 434,
    //     valuation: 1246,
    //     cagr: 1.3
    //   }, {
    //     title: 'Nippon flexi cap',
    //     currentNav: 3.4,
    //     investment: 6742,
    //     units: 4903,
    //     valuation: 2351,
    //     cagr: 3.5
    //   },
    // ];
  }

  gotoDetail(item) {
    console.log(item);
    console.log(this.page);
    this.appService.setData(item);
    this.navCtrl.navigateForward('/policy-detail/' + this.page);
  }
}
