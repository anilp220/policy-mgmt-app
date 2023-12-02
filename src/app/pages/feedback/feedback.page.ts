import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { PushService } from 'src/app/services/push.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  usr = { ...this.userService.user };

  uid: any;
  clientId: any;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    console.log(JSON.stringify(this.usr));
    console.log(this.usr.uid);
    console.log(this.usr.userInfo.clientId);

    this.uid = this.usr.uid;
    this.clientId = this.usr.userInfo.clientId;

    // this.userService.currentUserDetailRef().then(async () => {
    //   this.user = this.userService.user;
    //   this.uid = this.user.uid;
    //   // this.clientId = this.user.userInfo.clientId;
    // });
  }

  onSubmit(formData: NgForm) {
    console.log(formData.value);
    console.log(this.userService.sendFeedback(formData.value));
    formData.reset();
  }

}
