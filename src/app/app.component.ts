import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from './services/app.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user;
  selectedIndex = 1;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public userService: UserService,
    private authService: AuthService,
    public appService: AppService,
    private navCtrl: NavController,
    private statusBar: StatusBar
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
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString('#33000000');
        this.statusBar.overlaysWebView(true);
        this.statusBar.styleLightContent();

      } else {
        this.statusBar.backgroundColorByHexString('#33000000');
        this.statusBar.styleLightContent();
      }
      this.platform.backButton.subscribe((back) => {
        console.log(back);
        this.navCtrl.back();
      });
      if (await this.appService.getDataFromLocal('introComplete')) {
        console.log('introComplete');
        this.appService.presentLoading();
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
      }
      else {
        console.log('intro');
        this.navCtrl.navigateRoot('intro');
      }
    })
      .catch(err => {
        console.log('error platform', err);
      });

  }
}
