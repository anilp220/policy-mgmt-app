import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.page.html',
  styleUrls: ['./login-signup.page.scss'],
})
export class LoginSignupPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    console.log('login');
    this.router.navigateByUrl('login');
  }

  signup() {
    console.log('signup');
    this.router.navigateByUrl('signup');
  }
}
