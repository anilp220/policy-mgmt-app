/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.page.html',
  styleUrls: ['./policy-detail.page.scss'],
})
export class PolicyDetailPage implements OnInit {

  item;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.item = this.appService.getData();
    console.log(this.item);
  }

  fileAClaim() {
    window.open(this.item.claimUrl);
  }
}
