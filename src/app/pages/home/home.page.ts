import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { Models } from 'src/app/services/models.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  portfolio: any = [
    {
      name: this.models.titles.lifeInsurance,
      collection: this.models.collections.lifeInsurance,
    },
    {
      name: this.models.titles.mediclaim,
      collection: this.models.collections.mediclaim,
    },
    {
      name: this.models.titles.mutualFund,
      collection: this.models.collections.mutualFund,
    },
    {
      name: this.models.titles.equities,
      collection: this.models.collections.equities,
    },
    {
      name: this.models.titles.vehicleInsurance,
      collection: this.models.collections.vehicleInsurance,
    },
    {
      name: this.models.titles.corporateInsurance,
      collection: this.models.collections.corporateInsurance,
    },
    {
      name: this.models.titles.others,
      collection: this.models.collections.others
    }
  ];
  segragatedData = {};
  constructor(private navCtrl: NavController,
    private appService: AppService,
    private models: Models,
    public userService: UserService) {
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
        case this.models.collections.mutualFund:
        case this.models.collections.equities:
          this.mapOwner(port, element.investorName, element);
          break;
        case this.models.collections.lifeInsurance:
          this.mapOwner(port, element.nameOfLifeInsured, element);
          break;
        case this.models.collections.vehicleInsurance:
          this.mapOwner(port, element.nameOfOwner, element);
          break;
        case this.models.collections.mediclaim:
          this.mapOwner(port, element.typeOfPolicy, element);
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
