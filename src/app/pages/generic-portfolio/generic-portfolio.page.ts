import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generic-portfolio',
  templateUrl: './generic-portfolio.page.html',
  styleUrls: ['./generic-portfolio.page.scss'],
})
export class GenericPortfolioPage implements OnInit {
  portfolioData;
  title: any;
  item;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(_p => {
      const navParams = this.router.getCurrentNavigation().extras.state;
      if (navParams) {
        this.item = JSON.parse(navParams.item);
        this.title = navParams.title;
        console.log(this.item);
      }
    });
  }

  ngOnInit() {
  }



}
