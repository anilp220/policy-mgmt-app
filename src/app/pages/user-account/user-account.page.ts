import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {

  constructor(private appService:AppService,private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  async logout() {
    this.appService.isLoggedIn = false;
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
