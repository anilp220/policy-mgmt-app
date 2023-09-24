import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() userName: string;
  @Input() previewUrl: string;
  @Input() investorName: string;
  isDashboard = false;
  constructor(private navCtrl: NavController, private router: Router, public userService: UserService) {
    this.isDashboard = this.router.url === '/tabs/dashboard';
  }

  ngOnInit() {
    // console.log()
    if (this.title) {
      this.title = this.title.split('-').join(' ');
    }
    console.log(this.router.url);
  }

  gotoNotification() {
    this.navCtrl.navigateRoot('/notification');
  }
  goBack() {
    console.log(this.title);
    if (this.title === 'equities') {
      this.navCtrl.navigateRoot('/tabs/home');
      return;
    } else { this.navCtrl.back(); }
  }
}
