import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-refer-and-earn',
  templateUrl: './refer-and-earn.page.html',
  styleUrls: ['./refer-and-earn.page.scss'],
})
export class ReferAndEarnPage implements OnInit {

  usr = { ...this.userService.user };

  uid: any;
  clientId: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.uid = this.usr.uid;
    this.clientId = this.usr.userInfo.clientId;
  }

  onSubmit(formData) {
    console.log(formData);
    this.userService.sendReferAndEarn(formData.value);
    formData.reset();
  }

}
