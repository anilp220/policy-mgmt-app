import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notifications = [];
  constructor(
    private appService: AppService,
    private userService: UserService) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getData();
  }

  getData() {
    this.notifications = [];
    this.userService.getNotification().then(res => {
      res.forEach(docs => {
        docs.forEach(doc => {
          this.notifications.unshift(doc.data());
        });
      });
    });
    console.log(this.notifications);
  }

  async doRefresh(event) {
    console.log('refresh', event);
    this.appService.presentLoading('Refreshing...');
    this.getData();
    setTimeout(() => {
      this.appService.hideLoading();
    }, 1000);
    event.target.complete();
  }
}
