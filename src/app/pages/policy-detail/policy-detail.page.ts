/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.page.html',
  styleUrls: ['./policy-detail.page.scss'],
})
export class PolicyDetailPage implements OnInit {

  item;
  pageTitle;
  constructor(private appService: AppService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(res => {
      console.log(res);
      this.pageTitle = res.pageTitle;
    });
  }

  ngOnInit() {
    this.item = this.appService.getData();
    console.log(JSON.stringify(this.item));
  }

  fileAClaim() {
    window.open(this.item.claimUrl);
  }
}
