import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  invalidUserError;
  email;
  password;
  showPassword = false;
  constructor(private authService: AuthService,
    private appService: AppService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(formData: NgForm) {
    console.log(formData);
    this.appService.presentLoading();
    // setTimeout(() => {
    //   if (formData.value.email === 'admin@mailinator.com') {
    //     this.appService.isLoggedIn = true;
    //     this.router.navigateByUrl('tabs/home');
    //     this.appService.hideLoading();
    //     return;
    //   }
    // }, 3000);
    // return;
    this.authService.login(formData.value, async (success) => {
      console.log('success', success);
      this.appService.isLoggedIn = true;
      this.userService.currentUserDetailRef().then(currentUserDetail => {
        const user: any = currentUserDetail;
        console.log(user);
        if (user && user.role === 'client' && user.isActive) {
          // this.appService.setDataToLocal('token');
          this.appService.hideLoading();
          this.router.navigateByUrl('tabs/home', { replaceUrl: true });
        }
      });
    }, (err) => {
      console.log(err);
      this.appService.hideLoading();
      this.invalidUserError = 'Invalid email id or password!';
      this.appService.showToast(this.invalidUserError);
    });
  }

  GotoForgot() {

  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }
}
