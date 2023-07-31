import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { CameraService } from 'src/app/services/camera.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {

  usr = this.userService.user.userInfo;
  constructor(private appService: AppService,
    private userService: UserService,
    private camera: CameraService,
    private navCtrl: NavController,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async logout() {
    this.appService.isLoggedIn = false;
    this.userService.user.uid = null;
    this.userService.user.userInfo = {};
    await this.appService.removeDataFromLocal('userInfo');
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  editProfile() {
    this.navCtrl.navigateForward('/tabs/edit-profile');
  }

  selectImg() {
    this.camera.takePhoto(0)
      .then((imgData) => {
        this.usr.previewUrl = imgData;
        this.appService.presentLoading('Uploading...');
        return this.userService.uploadImgAndUpdate(imgData);
      })
      .then((imgUpload) => {
        console.log(imgUpload);
        this.appService.hideLoading();
      })
      .catch((err => {
        console.log(err);
        this.appService.hideLoading();
      }));
  }
}
