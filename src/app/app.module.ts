import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AngularFireModule, } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { FCM } from '@awesome-cordova-plugins/fcm/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot({ _forceStatusbarPadding: true }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    SplashScreen,
    StatusBar,
    Camera,
    FilePath,
    File,
    FCM,
    Network,
    LocalNotifications
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
