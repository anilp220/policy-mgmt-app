import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-upcoming-maturities',
  templateUrl: './upcoming-maturities.page.html',
  styleUrls: ['./upcoming-maturities.page.scss'],
})
export class UpcomingMaturitiesPage implements OnInit {

  tableTitle = [];
  tableData = {
    item: null,
    data: [],
    noData: 'NO RENEWALS THIS MONTH'
  };
  years = [
    { isClicked: true, year: '1 YEAR' },
    { isClicked: false, year: '5 YEARS' },
    { isClicked: false, year: '10 YEARS' },
    { isClicked: false, year: '15 YEARS' },
    { isClicked: false, year: '20 YEARS' },
    { isClicked: false, year: '25 YEARS' },
    { isClicked: false, year: '30 YEARS' },
    { isClicked: false, year: '35 YEARS' },
    { isClicked: false, year: '40 YEARS' },
    { isClicked: false, year: '45 YEARS' },
    { isClicked: false, year: '50 YEARS' },
  ];
  selectedYear = this.years[1].year;
  showSubmenu = false;
  renewalsObj = {};
  renewalsArr: any[] = [];
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
    this.tableTitle = [
      ['Product Type', 'Policy Type'],
      ['Investor Name', 'Company'],
      ['DOC', 'Frequency'],
      ['Renewal Date'],
      ['Amount']
    ];
    this.resetYearObj(5);
  }

  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  yearSelected(index) {
    this.selectedYear = this.years[index].year;
    const selectedYear = this.selectedYear.split(' ')[0];
    for (let i = 0; i < this.years.length; i++) {
      if (index === i) {
        this.years[i].isClicked = true;
      } else {
        this.years[i].isClicked = false;
      }
    }
    this.resetYearObj(selectedYear);
    this.popoverController.dismiss();
  }

  resetYearObj(year) {
    this.renewalsObj = {};
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < year; i++) {
      this.renewalsObj[currentYear + i] = {
        year: currentYear + i,
        data: [],
        tableData: {
          item: null,
          data: [],
          renewals: true
        },
        totalSum: 0
      };
    }
    console.log(this.renewalsObj);
    this.renewalsArr = Object.values(this.renewalsObj);
  }
}
