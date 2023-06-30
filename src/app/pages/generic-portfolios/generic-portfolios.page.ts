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
  policyType;
  pageIndex;
  pageTitle;
  items = [];
  error;
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

  ionViewWillEnter() {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.policyType = res.page;
      this.pageIndex = res.index;
      this.pageTitle = res.title;
      this.items = this.appService.getPolicies(this.policyType);
      // this.getData(this.page.split(' ').join('-').toLowerCase());
      console.log(this.policyType);
      console.log(this.pageIndex);
      console.log(this.pageTitle);
      console.log(this.items);
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
    console.log(this.policyType);
    this.appService.setData(item);
    this.navCtrl.navigateRoot('/tabs/policy-detail/' + this.policyType);
  }
}
