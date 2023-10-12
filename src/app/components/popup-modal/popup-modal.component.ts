import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss'],
})
export class PopupModalComponent implements OnInit {
  @Input() item;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.item);
  }

  dismiss() {
    this.modalCtrl.dismiss();
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
