/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Models } from 'src/app/services/models.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.page.html',
  styleUrls: ['./detail-page.page.scss'],
})
export class DetailPagePage implements OnInit {
  title: any;
  beforeRefresh: any;
  portfolioData: any;
  constructor(private route: ActivatedRoute,
    public models: Models, private router: Router) {
    this.route.queryParams.subscribe(_p => {
      const navParams = this.router.getCurrentNavigation().extras.state;
      if (navParams) {
        this.portfolioData = JSON.parse(navParams.item);
        this.title = navParams.title;
        this.beforeRefresh = JSON.parse(JSON.stringify(this.portfolioData));
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillInit() {

  }
}
