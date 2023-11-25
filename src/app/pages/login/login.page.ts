import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { PushService } from 'src/app/services/push.service';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic';
import { UserService } from 'src/app/services/user.service';
enum Title {
  signin = 'Sign In',
  forgotPassword = 'FORGOT PASSWORD',
  register = 'SIGN UP'
}
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
  forgotPassword = false;
  login = true;
  signup = false;
  title = Title.signin;
  constructor(private authService: AuthService,
    private appService: AppService,
    private router: Router,
    private platform:Platform,
    private pushService: PushService,
    private userService: UserService) {
    // const data = this.appService.getDataFromLocal()
    this.authService.getAuthState().subscribe((result) => {
      console.log(result);
    });
  }

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
      this.userService.currentUserDetailRef().then(async (currentUserDetail) => {
        const user: any = currentUserDetail;
        this.userService.user.userInfo = currentUserDetail;
        this.userService.user.uid = success.user.uid;
        await this.pushService.updateToken();
        // if(this.platform.is('android') || this.platform.is('ios')){
        //   const token = await FCM?.getToken();
        //   console.log(token);
        //   await this.userService.updateUser({ registrationId: token || '' }, success.user.uid);
        // }
        console.log(user);
        if (user && user.role === 'client' && user.isActive) {
          this.appService.setDataToLocal('userInfo', user).then(async () => {
            await this.userService.getAllCollection();
            this.appService.hideLoading();
            this.router.navigateByUrl('tabs/dashboard', { replaceUrl: true });
          })
            .catch(err => {
              this.appService.hideLoading();
              console.log(err);
            });
        }
      });
    }, (err) => {
      console.log(err);
      this.appService.hideLoading();
      this.invalidUserError = 'Invalid email id or password!';
      this.appService.showToast(this.invalidUserError,2000,true);
    });
  }

  async resetPassword() {
    try {
      this.appService.presentLoading();
      const result = await this.authService.forgetPassword(this.email);
      this.forgotPassword = !this.forgotPassword;
      this.title = Title.signin;
      this.appService.hideLoading();
      this.appService.showToast('Link to reset the password has been sent to your email.',);
    } catch (error) {
      console.log(error.message);
      this.appService.hideLoading();
      this.appService.showToast('Incorrect email address!',2000,true);
    }
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  onForgotClick() {
    this.forgotPassword = !this.forgotPassword;
    this.title = Title.forgotPassword;
  }

  backToLogin() {
    this.forgotPassword = !this.forgotPassword;
    this.title = Title.signin;
  }

  register() {
    this.title = Title.register;
  }
}
