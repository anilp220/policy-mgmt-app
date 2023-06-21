import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
enum Titles {
  upcomingRenewal = 'Up-coming Renewals',
  upcomingMaturities = 'Up-coming Maturities',
  transactions = 'Transactions'
}
@Component({
  selector: 'app-upcoming-payments',
  templateUrl: './upcoming-payments.page.html',
  styleUrls: ['./upcoming-payments.page.scss'],
})
export class UpcomingPaymentsPage implements OnInit {
  title;
  items;
  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.activatedRoute.params.subscribe(param => {
      this.title = param.type;
    });
  }

  ngOnInit() {
    switch (this.title) {
      case Titles.upcomingMaturities:
        this.getUpcomingMaturities();
        break;
      case Titles.upcomingRenewal:
        this.getUpcomingRenewal();
        break;
      case Titles.transactions:
        this.getTransactions();
        break;
      default:
        break;
    }
  }

  getUpcomingMaturities() {
    this.items = [
      {
        status: 'Axis Multicap Fund',
        date: '10-oct-2020',
        amount: 12231
      }, {
        status: 'Axis Multicap Fund',
        date: '10-oct-2020',
        amount: 12231
      }, {
        status: 'Axis Multicap Fund',
        date: '10-oct-2020',
        amount: 12231
      }, {
        status: 'Axis Multicap Fund',
        date: '10-oct-2020',
        amount: 12231
      },
    ];
  }

  getUpcomingRenewal() {
    this.items = [
      {
        status: 'Axis Multicap Fund',
        date: '10-oct-2020',
        link: 'www.google.com'
      }, {
        status: 'Axis Multicap Fund',
        date: '10-oct-2020',
        link: 'www.google.com'
      }, {
        status: 'Axis Multicap Fund',
        date: '10-oct-2020',
        link: 'www.google.com'
      }, {
        status: 'Axis Multicap Fund',
        date: '10-oct-2020',
        link: 'www.google.com'
      },
    ];
  }

  getTransactions() {
    this.items = [
      {
        status: 'Axis Multicap Fund',
        date: '10-oct-2020',
        amount: 3421
      }, {
        status: 'Axis Multicap Fund',
        date: '10-oct-2020',
        amount: 3421
      }, {
        status: 'Axis Multicap Fund',
        date: '10-oct-2020',
        amount: 3421
      },
    ];
  }

}
