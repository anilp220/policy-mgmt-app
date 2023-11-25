import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AppService } from './app.service';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { NotificationPage } from '../pages/notification/notification.page';

@Injectable({
  providedIn: 'root'
})

export class PushService {

  constructor(
    private localNotifications: LocalNotifications,
    private platform: Platform,
    private appService: AppService,
    private userService: UserService
  ) { }

  // pushSetup() {
  //   const options: PushOptions = {
  //     android: {
  //       senderID: '786355942521',
  //       sound: true,
  //       vibrate: true,
  //       icon: 'icon',
  //       iconColor: 'red',
  //     },
  //     ios: {
  //       alert: 'true',
  //       badge: true,
  //       sound: true,
  //     },
  //     windows: {},
  //   };

  //   const pushObject: PushObject = this.push.init(options);
  //   pushObject.on('notification').subscribe((notification: any) => {
  //     console.log('notification', notification);
  //     if (notification.additionalData.foreground) {
  //     } else {
  //       // this.authService.getCurrentUser().then(
  //       //   (auth) => {
  //       //     if (auth) {
  //       //       this.navCtrl.navigateRoot(
  //       //         `/tabs/${notification.additionalData.path}`
  //       //       );
  //       //     }
  //       //     else { this.appService.presentLoginRequiredAlert(); }
  //       //   },
  //       //   (err) => {
  //       //     console.log(err);
  //       //   }
  //       // );
  //     }
  //   });

  //   pushObject.on('registration').subscribe((registration: any) => {
  //     console.log(registration.registrationId);
  //     this.appService.setRegistrationId(registration.registrationId);
  //     if (registration.registrationId) {
  //       this.authService.getCurrentUser().then(
  //         (auth: any) => {
  //           if (auth) {
  //             this.userService
  //               .updateUser({
  //                 registrationId: registration.registrationId,
  //               }, this.userService.user.uid)
  //               .then((val) => { });
  //           }
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //     }
  //   });

  //   pushObject.on('error').subscribe((error: any) => {
  //     console.error('Error with Push plugin', error);
  //   });
  // }

  async fcmSetup() {
    FCM.onNotification().subscribe(async (data) => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
        this.showLocalNotification(data);
      };
    });
    console.log('has permission', await FCM.hasPermission());
    if(await FCM.hasPermission()){
     await  FCM.requestPushPermission();
    }
    this.updateToken();
    // FCM.onTokenRefresh().subscribe(token => {
    //   console.log('FCM token', token);
    //   // Register your new token in your back-end if you want
    //   // backend.registerToken(token);
    // });
  }

  getToken() {
    // return FCM.getToken();
    return;
  }

  async updateToken(){
    console.log(this.platform.is('mobileweb'))
    if(!this.platform.is('mobileweb')){
    const token = await FCM.getToken();
    console.log(token);
    console.log('asd',this.userService.user.uid);
    this.userService
    .updateUser({
      registrationId: token,
    }, this.userService.user.uid)
    .then((val) => { });}
  }

  showLocalNotification(data) {
    this.localNotifications.schedule({
      id: Date.now(),
      sound: this.platform.is('android') ? 'file://sound.mp3' : 'file://beep.caf',
      title: data.title,
      text: data.body,
      data
    });
  }
}
