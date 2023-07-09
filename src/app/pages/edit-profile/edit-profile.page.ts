import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { CameraService } from 'src/app/services/camera.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  usr = { ...this.userService.user.userInfo };

  constructor(private appService: AppService,
    private userService: UserService,
    private camera: CameraService,
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router) { }


  ngOnInit() {
    console.log(JSON.stringify(this.usr));
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

  submitForm(form) {
    console.log(form);
  }

  calcAge() {
    const year = new Date().getFullYear();
    const dobYear = new Date(this.usr.dob).getFullYear();
    this.usr.age = year - dobYear;
  }

  dematChange() {

  }

  rmChild(i) {

  }
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  triggerFile() {
    throw new Error('Method not implemented.');
  }
  addChild() {
    throw new Error('Method not implemented.');
  }
}

