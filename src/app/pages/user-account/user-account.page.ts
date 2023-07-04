import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {

  constructor(private appService: AppService,
    private userService: UserService,
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
}
