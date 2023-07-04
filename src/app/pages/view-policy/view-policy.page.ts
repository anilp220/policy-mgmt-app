import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.page.html',
  styleUrls: ['./view-policy.page.scss'],
})
export class ViewPolicyPage implements OnInit {
  item;
  constructor(public appService: AppService) { }

  ngOnInit() {
    this.item = this.appService.getData();
    console.log(JSON.stringify(this.item));
    delete this.item.clientId;
    delete this.item.clientUid;
    delete this.item.createdBy;
    delete this.item.creationDate;
    delete this.item.isActive;
    delete this.item.isNewUser;
    delete this.item.SameAsProposer;
    delete this.item.isActive;
    delete this.item.isAppointee;
    delete this.item.isAssignee;
    delete this.item.isBetterHalf;
    delete this.item.isMoneyBack;
  }

}
