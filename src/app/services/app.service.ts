import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isLoggedIn = true;
  loading: HTMLIonLoadingElement;
  genericData;
  policies = [];
  isOnline = false;
  registrationId;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private localStorage: Storage
  ) { }

  setData(data) {
    this.genericData = data;
  }

  getData() {
    return this.genericData;
  }

  setPolicies(data) {
    this.policies = data;
  }

  getPolicies(policyType) {
    return policyType === 'equities' ? this.policies :
      this.policies.filter(
        policy => (policy.typeOfPolicy === policyType) || (policy.modeOfInvestment === policyType)
      );
  }

  getDataFromLocal(param) {
    return this.localStorage.get(param);
  }

  setDataToLocal(key, value) {
    return this.localStorage.set(key, JSON.stringify(value));
  }

  removeDataFromLocal(param) {
    return this.localStorage.remove(param);
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
      message: message || 'Loading...'
    });
    await this.loading.present();
  }

  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }

  camelCaseToNormal(str) {
    // Find all capital letters preceded by a lowercase letter
    const result = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    // Convert the string to lowercase and capitalize the first letter
    return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
  }

  isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // Protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // Fragment locator
    return pattern.test(str);
  }

  setRegistrationId(registrationId: any) {
    this.registrationId = registrationId;
  }
}
