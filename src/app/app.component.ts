import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from './services/app.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

declare let firebase;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user;
  selectedIndex = 1;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public userService: UserService,
    private authService: AuthService,
    public appService: AppService,
    // private router: Router
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  // async logout() {
  //   this.appService.isLoggedIn = false;
  //   await this.authService.logout();
  //   this.navCtrl.navigateRoot('/login', { replaceUrl: true });
  // }

  async initializeApp() {
    // this.userService.token = JSON.parse(await this.appService.getDataFromLocal('token'));
    // console.log('this.userService.token', this.userService.token);
    this.platform.ready().then(async () => {
      this.splashScreen.hide();
      this.appService.presentLoading();
      // if (this.platform.is('android')) {
      //   this.statusBar.backgroundColorByHexString("#33000000")
      // } else {
      //   this.statusBar.backgroundColorByHexString("#33000000")
      //   this.statusBar.styleLightContent();
      // }
      if (await this.appService.getDataFromLocal('introComplete')) {
        console.log('introComplete');
        const subscription = this.authService.getAuthState().subscribe(async (res) => {
          if (res && res.uid) {
            console.log('current user', res.uid);
            this.userService.user.uid = res.uid;
            const data = await this.userService.getUserDetail(res.uid);
            this.userService.user.userInfo = data.data();
            await this.userService.getAllCollection();
            this.appService.hideLoading();
            console.log(this.userService.user);
          } else {
            this.appService.hideLoading();
            this.navCtrl.navigateRoot('/login', { replaceUrl: true });
          }
          subscription.unsubscribe();
        });
        // if (token) {
        //   console.log('User token available ', token);
        //   this.userService.token = token;
        //   this.userService.GET('details').subscribe((user: any) => {
        //     console.log('Get user details success ', user);
        //     if (user) {
        //       console.log('Goto Home page');
        //       this.userService.user = user.data;
        //       this.appService.navigateRoot('home');
        //     } else {
        //       console.log('Goto Logout and signin');
        //       this.authService.logout();
        //     }
        //   });
        // } else {
        //   console.log('User token not available ');
        //   this.authService.logout();
        // }
      }
      else {
        this.appService.hideLoading();
        console.log('intro');
        this.navCtrl.navigateRoot('intro');
      }
    })
      .catch(err => {
        console.log('error platform', err);
      });

  }
}
