import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { Models } from 'src/app/services/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  portfolio: any = [
    {
      name: Models.titles.lifeInsurance,
      collection: Models.collections.lifeInsurance,
    },
    {
      name: Models.titles.mediclaim,
      collection: Models.collections.mediclaim,
    },
    {
      name: Models.titles.mututalFund,
      collection: Models.collections.mututalFund,
    },
    {
      name: Models.titles.equities,
      collection: Models.collections.equities,
    },
    {
      name: Models.titles.vehicleInsurance,
      collection: Models.collections.vehicleInsurance,
    },
    {
      name: Models.titles.corporateInsurance,
      collection: Models.collections.corporateInsurance,
    },
    {
      name: Models.titles.others,
      collection: Models.collections.others
    }
  ];
  segragatedData = {};
  constructor(private navCtrl: NavController, private appService: AppService, public userService: UserService) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.eachPortfolio();
    }, 1000);
  }

  resetSegragatedData() {
    this.segragatedData = {
      'life-insurance': {},
      mediclaim: {},
      'mutual-fund': {},
      equities: {},
      'vehicle-insurance': {},
      'corporate-insurance': {},
      others: {},
    };
  }

  eachPortfolio() {
    this.resetSegragatedData();
    this.portfolio.forEach(port => {
      this.segragateData(port);
    });
  }

  async doRefresh(event) {
    console.log('refresh', event);
    await this.appService.presentLoading('Refreshing...');
    await this.userService.getAllCollection();
    this.eachPortfolio();
    await this.appService.hideLoading();
    event.target.complete();
  }

  redirectTo(path) {
    this.navCtrl.navigateForward(path);
  }

  onClick(port) {
    console.log(this.segragatedData[port.collection]);
    console.log(this.userService.allCollections[port.collection]);
    this.navCtrl.navigateForward('tabs/generic-portfolio', {
      state: {
        item: JSON.stringify(this.segragatedData[port.collection]),
        title: port.name
      }
    });
  }

  segragateData(port) {
    const col = this.userService.allCollections[port.collection];
    col.map(element => {
      switch (port.collection) {
        case 'mutual-fund':
        case 'equities':
          this.mapOwner(port, element.investorName, element);
          break;
        case 'life-insurance':
          this.mapOwner(port, element.nameOfLifeInsured, element);
          break;
        default:
          break;
      }
    });
  }

  mapOwner(port, name, element) {
    if (this.segragatedData[port.collection][name]) {
      this.segragatedData[port.collection][name].push(element);
    } else {
      this.segragatedData[port.collection][name] = [element];
    }
  }
}
