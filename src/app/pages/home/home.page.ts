import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';

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
      path: '/tabs/type-of-policy/',
    },
    {
      name: 'Mediclaim',
      collection: 'mediclaim',
      path: '/tabs/type-of-policy/',
    },
    {
      name: 'Mutual Fund',
      collection: 'mutual-fund',
      path: '/tabs/type-of-policy/',
    },
    {
      name: 'Equities',
      collection: 'equities',
      path: '/tabs/type-of-policy/'
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
      name: 'Others',
      collection: 'others',
      path: '/tabs/type-of-policy/'
    }
  ];
  constructor(private navCtrl: NavController, private appService: AppService, public userService: UserService) {
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

  async doRefresh(event) {
    console.log('refresh', event);
    this.appService.presentLoading('Refreshing...');
    await this.userService.getAllCollection();
    this.appService.hideLoading();
    event.target.complete();
  }

  redirectTo(path) {
    this.navCtrl.navigateForward(path);
  }
}
