import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(value, success, error) {
    this.firebaseAuth.createUserWithEmailAndPassword(
      value.email,
      value.password
    ).then((user) => {
      success(user);
    }).catch(error);
  }

  getCurrentUser(successCallback, errorCallBack) {
    this.firebaseAuth.authState.subscribe(successCallback, errorCallBack);
  }

  login(loginData, success, error) {
    this.firebaseAuth
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(value => {
        // console.log('Nice, it worked!');
        success(value);
      })
      .catch(err => {
        // console.log('Something went wrong:',err.message);
        error(err);
      });
  }

  logout() {
    return this.firebaseAuth
      .signOut();
  }

  forgetPassword(email) {
    return this.firebaseAuth.sendPasswordResetEmail(email);
  }

  // retrieveCredential(email, pwd) {
  //   return this.auth.EmailAuthProvider.credential(email, pwd)
  // }

  // reauthenticate(credential) {
  //   return this.firebaseAuth.auth.currentUser.reauthenticateWithCredential(credential)
  // }

  async updatePassword(newPassword) {
    const currentUser = await this.firebaseAuth.currentUser;
    return currentUser.updatePassword(newPassword);
  }
}
