/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { Models } from './models.service';
import { environment } from 'src/environments/environment';
import { CameraService } from './camera.service';
import { SipType } from '../enums/sip-type-enum';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: any;
  user = {
    uid: '',
    userInfo: null
  };
  genericData;
  allCollections = {
    [this.models.collections.lifeInsurance]: [],
    [this.models.collections.mediclaim]: [],
    [this.models.collections.mutualFund]: [],
    [this.models.collections.equities]: [],
    [this.models.collections.vehicleInsurance]: [],
    [this.models.collections.corporateInsurance]: [],
    [this.models.collections.fixedDeposit]: [],
    [this.models.collections.loans]: [],
  };
  allSchemes: any;
  allEquities: any;
  sipType = SipType;
  constructor(private firebaseAuth: AngularFireAuth,
    private fireStorage: AngularFireStorage,
    private appService: AppService,
    private http: HttpClient,
    private models: Models,
    private cameraService: CameraService,
    private firestore: AngularFirestore) { }

  async currentUserDetailRef() {
    const currentUser = await this.firebaseAuth.currentUser;
    console.log(currentUser);
    if (currentUser) {
      this.user.uid = currentUser.uid;
      return (await this.firestore.collection('users').doc(this.user.uid).get().toPromise()).data();
    }
    return;
  }

  async findUserByEmail(email) {
    return this.firestore.collection('users').ref.where('email', '==', email).get();
  }

  getUserDetail(uid) {
    return this.firestore.collection('users').doc(uid).get().toPromise();
  }

  getDocument(col: any, clientId: any) {
    return this.firestore.collection(col).ref.where('clientId', '==', clientId).get();
  }

  getAllCollection(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.resetAllCollection();
        const collection = [
          this.models.collections.lifeInsurance,
          this.models.collections.mediclaim,
          this.models.collections.mutualFund,
          this.models.collections.equities,
          this.models.collections.vehicleInsurance,
          this.models.collections.corporateInsurance,
          this.models.collections.fixedDeposit,
          this.models.collections.loans,
        ];
        const promiseArr = [];
        collection.forEach((col) => {
          promiseArr.push(this.getDocument(col, this.user?.userInfo?.clientId));
        });
        Promise.all(promiseArr)
          .then((result) => {
            if (result.length) {
              result.forEach(cols => {
                if (!cols.empty) {
                  cols.docs.forEach(doc => {
                    const path = doc.ref.path.split('/');
                    const collectionName = path[0];
                    this.allCollections[collectionName].push(doc.data());
                  });
                }
              });
            }
          });
        return resolve(Promise.all(promiseArr));
      } catch (error) {
        return reject(error);
      }
    });
  }

  resetAllCollection() {
    for (const key in this.allCollections) {
      if (Object.prototype.hasOwnProperty.call(this.allCollections, key)) {
        this.allCollections[key] = [];
      }
    }
  }

  uploadFile(path, data) {
    return this.fireStorage.upload(path, data);
  }

  uploadImgAndUpdate(blob): Promise<any> {
    return new Promise(async (res, rej) => {
      try {
        blob = await (await fetch(blob)).blob();
        const imgUpload = await this.uploadFile('/users/' + this.user.uid, blob);
        this.user.userInfo.previewUrl = await imgUpload.ref.getDownloadURL();
        const updateduser = await this.updateUser({ previewUrl: this.user.userInfo.previewUrl }, this.user.uid);
        res(updateduser);
      } catch (error) {
        console.log(error);
        rej(error);
      }
    });
  }

  updateUser(data, uid) {
    return this.firestore.collection('users').doc(uid).ref.update(data);
  }

  getNotification() {
    const ref = this.firestore.collection('notifications').ref;
    const promise = [
      ref.where('uid', '==', 'all').orderBy('creationDate', 'asc').get(),
      ref.where('uid', '==', this.user.uid).get()
    ];
    return Promise.all(promise);
  }

  // async fetchAllSchemes() {
  //   const localData = await this.appService.getDataFromLocal('allSchemes');
  //   if (localData) {
  //     // console.log('data from local', localData);
  //     return JSON.parse(localData);
  //   }
  //   const allSchemes = await this.http.get(environment.getAllScheme).toPromise();
  //   await this.appService.setDataToLocal('allSchemes', JSON.stringify(allSchemes));
  //   return allSchemes;
  // }

  getMFPriceById(id){
    return this.firestore.collection('mutualfundnav').doc(id).get().toPromise();
  }

  fetchRapidApi(Identifier?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        headers: {
          'X-RapidAPI-Key': '10c1a577b3mshba9e708290ede0bp1c1031jsnd7730f7f19af',
          'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
        }
      };
      if (Identifier) {
        options['params'] = {
          Identifier
        };
      }
      this.http.get('https://latest-stock-price.p.rapidapi.com/any', options)
        .toPromise()
        .then(result => {
          if (Identifier) {
            resolve(result);
          } else {
            this.allEquities = result;
          }
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
  downloadPdf() {
    console.log(this.allCollections[this.models.collections.mutualFund]);
    return this.mapCurrentNavToMF()
      .then(()=>this.mapEquityCurrentPrice())
      .then(() => {
      const body = {
        userInfo: this.user.userInfo,
        ...this.allCollections
      };
      console.log(body);
      return this.http.post(
        environment.cloufFuncBaseUrl + '/generatePdf',
        body, {
        headers: {
          Accept: 'application/pdf'
        },
        responseType: 'blob'
      }
      ).toPromise()
        .then(result => {
          console.log(result);
          this.cameraService.savePdf(result);
        });
    }).catch(error => {
      throw error;
    });
  }

  async mapCurrentNavToMF() {
    try {
      const mfData = this.allCollections[this.models.collections.mutualFund];
      for (const data of mfData) {
        if (data.company?.id) {
          const result = await this.getMFPriceById(data.company.id);
          data.currentNav = result;
          if (data.currentUnits && data.currentNav) {
            data.currentFundValue = (data.currentUnits * data.currentNav).toFixed(4);
          }
          if ((data.modeOfInvestment === this.sipType.SIP ||
            data.modeOfInvestment === this.sipType.LUMPSUMSIP) && data.currentFundValue && data.currentInvestedValue) {
              data.currentReturn = Math.abs(((data.currentFundValue - data.currentInvestedValue) / data.currentInvestedValue) * 100).toFixed(4);
          }
          if (data.modeOfInvestment === this.sipType.LUMPSUM && data.currentFundValue && data.amountInvested) {
            data.currentReturn = Math.abs(((data.currentFundValue - data.amountInvested) / data.amountInvested) * 100).toFixed(4);
          }
        }
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  async mapEquityCurrentPrice(){
    try {
      const equityData = this.allCollections[this.models.collections.equities];
      for (const data of equityData) {
        if(data.company?.identifier){
          const result = await this.fetchRapidApi(data.company.identifier);
          if(result?.length){
            data.currentSharePrice = result[0].lastPrice;
            data.currentFundValue = (data.currentShares * data.currentSharePrice).toFixed(2);
            data.currentReturn = (((data.currentFundValue - data.amountInvested) / data.amountInvested) * 100).toFixed(2);
            return data;
          }else{
            throw new Error();
          }
        }else{
          throw new Error();
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  sendFeedback(feedback: any) {
    return this.firestore.collection('feedbacks').ref.add(feedback);
  }

  sendReferAndEarn(data: any) {
    return this.firestore.collection('refer-and-earn').ref.add(data);
  }
}
