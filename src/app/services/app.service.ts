import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isLoggedIn = true;
  loading: any;
  genericData;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  setData(data) {
    this.genericData = data;
  }

  getData() {
    return this.genericData;
  }

  getDataFromLocal(param) {
    return JSON.parse(localStorage.getItem(param));
  }

  setDataToLocal(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  async showToast(msg: string, duration?: number) {
    let message = msg;
    if (!message || message.length === 0) {
      message = 'Something went wrong';
    }
    const toast = await this.toastCtrl.create({
      message,
      position: 'bottom',
      duration: duration ? duration : 2000,
    });
    toast.present();
  }


  async presentLoading(message?: string) {
    if (this.loading) {
      return;
    }
    this.loading = await this.loadingCtrl.create({
      showBackdrop: true,
    });
    this.loading.present();
  }

  async hideLoading() {
    // console.log(this.loading)
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }
}
