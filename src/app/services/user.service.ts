/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { Models } from './models';

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
    [Models.collections.lifeInsurance]: [],
    mediclaim: [],
    'mutual-fund': [],
    equities: [],
    'vehicle-insurance': [],
    'corporate-insurance': [],
    others: [],
  };
  allSchemes: any;
  allEquities: any;
  constructor(private firebaseAuth: AngularFireAuth,
    private fireStorage: AngularFireStorage,
    private appService: AppService,
    private http: HttpClient,
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
        const collection = ['life-insurance',
          'mediclaim',
          'mutual-fund',
          'equities',
          'vehicle-insurance',
          'corporate-insurance',
          'others'];
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

  async fetchAllSchemes() {
    const localData = await this.appService.getDataFromLocal('allSchemes');
    if (localData) {
      // console.log('data from local', localData);
      this.allSchemes = JSON.parse(localData);
      return;
    }
    this.allSchemes = await this.http.get('https://mynk.me/mfapi/get-all-scheme').toPromise();
    await this.appService.setDataToLocal('allSchemes', JSON.stringify(this.allSchemes));
    console.log(this.allSchemes);
  }

  fetchSelectedScheme(id): any {
    return this.http.get('https://mynk.me/mfapi/get-scheme-data/' + id).toPromise();
  }

  fetchRapidApi(identifier?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        headers: {
          'X-RapidAPI-Key': '10c1a577b3mshba9e708290ede0bp1c1031jsnd7730f7f19af',
          'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
        }
      };
      if (identifier) {
        options['params'] = {
          identifier
        };
      }
      this.http.get('https://latest-stock-price.p.rapidapi.com/any', options)
        .toPromise()
        .then(result => {
          // console.log('rapid resp', result);
          if (identifier) {
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
}
