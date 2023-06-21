import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portfolio-investments',
  templateUrl: './portfolio-investments.page.html',
  styleUrls: ['./portfolio-investments.page.scss'],
})
export class PortfolioInvestmentsPage implements OnInit {
  page;
  portfoliosInvestments = {
    portfolio: [
      {
        name: 'Life Insurance',
        collection: 'life-insurance'
      },
      {
        name: 'Medicare',
        collection: 'medicare'
      },
      {
        name: 'Mutual Fund',
        collection: 'mutual-fund'
      },
      {
        name: 'Vehicle Insurance',
        collection: 'vehicle-insurance'
      },
      {
        name: 'Equity',
        collection: 'equity'
      },
      {
        name: 'Bond Debenture',
        collection: 'bond-debenture'
      }
    ],
    investments: [
      {
        name: 'Annual Investments',
        collection: ''
      },
      {
        name: 'Single Pay Investments',
        collection: ''
      },
      {
        name: 'Premium Paid By Self',
        collection: ''
      },
      {
        name: 'Premium Paid By Spouse',
        collection: ''
      },
      {
        name: 'Premium Paid By Child',
        collection: ''
      }
    ]
  };
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(param => {
      this.page = param.page;
      console.log(this.page);
    });
  }

  ngOnInit() {
  }
}
