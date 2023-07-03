import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController } from '@ionic/angular';

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
  constructor(private firebaseAuth: AngularFireAuth,
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

  getDocument(col: any, clientId: any) {
    return this.firestore.collection(col).ref.where('clientId', '==', clientId).get();
  }

  getAllCollection(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
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
        return resolve(Promise.all(promiseArr));
      } catch (error) {
        return reject(error);
      }
    });
  }
}
