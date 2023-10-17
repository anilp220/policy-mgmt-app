import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Models } from 'src/app/services/models.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-generic-portfolio',
  templateUrl: './generic-portfolio.page.html',
  styleUrls: ['./generic-portfolio.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericPortfolioPage implements OnInit {
  portfolioData;
  title: any;
  beforeRefresh;
  constructor(private route: ActivatedRoute,
    private appService: AppService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    public models: Models, private router: Router) {
    this.route.queryParams.subscribe(_p => {
      const navParams = this.router.getCurrentNavigation().extras.state;
      if (navParams) {
        this.portfolioData = JSON.parse(navParams.item);
        console.log(this.portfolioData);
        this.title = navParams.title;
        this.beforeRefresh = JSON.parse(JSON.stringify(this.portfolioData));
      }
    });
  }

  async ngOnInit() {
    await this.appService.presentLoading();
    if (this.title !== this.models.titles.equities && this.title !== this.models.titles.mutualFund) {
      await this.appService.hideLoading();
    }
  }

  async doRefresh(event) {
    await this.appService.presentLoading('Refreshing...');
    this.portfolioData = null;
    this.portfolioData = JSON.parse(JSON.stringify(this.beforeRefresh));
    await this.userService.getAllCollection();
    if (this.title !== this.models.titles.equities || this.title !== this.models.titles.mutualFund) {
      await this.appService.hideLoading();
    }
    this.cdr.detectChanges();
    event.target.complete();
  }

}
