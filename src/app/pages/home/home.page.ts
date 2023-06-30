import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  portfolio: any = [
    {
      name: 'Life Insurance',
      collection: 'life-insurance',
      path: '/tabs/type-of-policy/'
    },
    {
      name: 'Mediclaim',
      collection: 'mediclaim',
      path: '/tabs/type-of-policy/'
    },
    {
      name: 'Mutual Fund',
      collection: 'mutual-fund',
      path: '/generic-portfolios/'
    },
    {
      name: 'Vehicle Insurance',
      collection: 'vehicle-insurance',
      path: '/tabs/type-of-policy/'
    },
    {
      name: 'Corporate Insurance',
      collection: 'corporate-insurance',
      path: '/tabs/type-of-policy/'
    },
    {
      name: 'Equities',
      collection: 'equities',
      path: '/generic-portfolios/'
    },
    {
      name: 'Others',
      collection: 'others',
      path: '/tabs/portfolio-investments/'
    }
  ];
  constructor(private navCtrl: NavController) {
    this.portfolio.map(port => {
      port.path += port.collection + '/';
    });
    console.log(this.portfolio);
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    // this.loadSimplePieChart();
  }
  // loadSimplePieChart() {
  //   this.pieChart = {
  //     chartType: 'PieChart',
  //     dataTable: [
  //       ['Task', 'Hours per Day'],
  //       ['Work', 11],
  //       ['Eat', 2],
  //       ['Commute', 2],
  //       ['Watch TV', 2],
  //       ['Sleep', 7]
  //     ],
  //     //opt_firstRowIsData: true,
  //     options: {
  //       title: 'Tasks',
  //       height: 600,
  //       width: '100%'
  //     },
  //   };
  // }

  redirectTo(path) {
    this.navCtrl.navigateRoot(path);
  }
}
