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
    userInfo: {}
  };
  genericData;
  constructor(private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore) { }

  async currentUserDetailRef() {
    const currentUser = await this.firebaseAuth.currentUser;
    console.log(currentUser);
    if (currentUser) {
      this.user.uid = currentUser.uid;
      return this.firestore.collection('users').doc(this.user.uid).get();
    }
    return;
  }

  getDocument(col, clientId) {
    return this.firestore.collection(col).ref.get();
  }

}
