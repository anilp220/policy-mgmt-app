import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from './services/app.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { PushService } from './services/push.service';
import { Router } from '@angular/router';
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
    private statusBar: StatusBar,
    private network: Network,
    private pushService: PushService,
    private router: Router
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
      this.setPlatform();
      this.checkNetwork();
      this.getCurrentUser();
    }).catch(err => {
      console.log('error platform', err);
    });
  }

  setPlatform() {
    if (this.platform.is('android')) {
      this.statusBar.backgroundColorByHexString('#33000000');
      // this.statusBar.overlaysWebView(true);
      this.statusBar.styleLightContent();
    } else {
      this.statusBar.backgroundColorByHexString('#33000000');
      this.statusBar.styleLightContent();
    }
    this.platform.backButton.subscribe(() => {
      if (this.router.url === '/tabs/generic-portfolios/equities/equities/0') {
        this.navCtrl.navigateBack('/tabs/home');
      }
      else if(this.router.url==='/login'){
        document.addEventListener('backbutton', (event)=> {
          event.preventDefault();
          event.stopPropagation();
        }, false);
      }
       else if (this.router.url !== '/tabs/home') { this.navCtrl.back(); }
    });
  }

  checkNetwork() {
    this.network.onDisconnect().subscribe({
      next: () => {
        this.appService.showToast('You are offline now.', 3000,true);
        this.appService.isOnline = false;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.network.onConnect().subscribe({
      next: () => {
        this.appService.isOnline = true;
        // this.getCurrentUser();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  async getCurrentUser() {
    if (await this.appService.getDataFromLocal('introComplete')) {
      console.log('introComplete');
      this.appService.presentLoading();
      const subscription = this.authService.getAuthState().subscribe(async (res) => {
        if (res && res.uid) {
          console.log('current user', res.uid);
          this.userService.user.uid = res.uid;
          const data = await this.userService.getUserDetail(res.uid);
          this.userService.user.userInfo = data.data();
          this.pushService.fcmSetup();
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
  }
}
