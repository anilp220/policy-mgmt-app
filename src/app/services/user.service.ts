import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
    'life-insurance': [],
    mediclaim: [],
    'mutual-fund': [],
    equities: [],
    'vehicle-insurance': [],
    'corporate-insurance': [],
    others: [],
  };
  constructor(private firebaseAuth: AngularFireAuth,
    private fireStorage: AngularFireStorage,
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
}
