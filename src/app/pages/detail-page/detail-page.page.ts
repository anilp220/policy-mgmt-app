/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopupModalComponent } from 'src/app/components/popup-modal/popup-modal.component';
import { Models } from 'src/app/services/models.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.page.html',
  styleUrls: ['./detail-page.page.scss'],
})
export class DetailPagePage implements OnInit {
  title: any;
  beforeRefresh: any;
  portfolioData: any;
  investorName: any;
  allItems: any;
  constructor(private route: ActivatedRoute,
    private modalCtrl: ModalController,
    public models: Models, private router: Router) {
    this.route.queryParams.subscribe(_p => {
      const navParams = this.router.getCurrentNavigation().extras.state;
      if (navParams) {
        this.portfolioData = JSON.parse(navParams.item);
        this.investorName = navParams.investorName;
        this.title = navParams.title;
        this.allItems = JSON.parse(navParams.allItems);
        this.beforeRefresh = JSON.parse(JSON.stringify(this.portfolioData));
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillInit() {

  }

  isObject(value) {
    if (value == null) {
      return false;
    }
    return typeof value == 'object';
  }

  async openModal(data, id) {
    console.log(data, id);
    const modal = await this.modalCtrl.create({
      component: PopupModalComponent,
      backdropDismiss: false,
      id,
      componentProps: {
        item: data
      },
      cssClass: 'custom-modal'
    });
    return await modal.present();
  }
}
