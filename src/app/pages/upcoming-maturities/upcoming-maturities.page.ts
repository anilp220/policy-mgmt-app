import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-maturities',
  templateUrl: './upcoming-maturities.page.html',
  styleUrls: ['./upcoming-maturities.page.scss'],
})
export class UpcomingMaturitiesPage implements OnInit  {

  months = [
    {
      month:1,
      isClicked:true,
    },
    {
      month:3,
      isClicked:false,
    },
    {
      month:6,
      isClicked:false,
    }, {
      month:12,
      isClicked:false,
    }
  ];
  tableTitle = [];
  tableData = {
    item: null,
    data: [],
    noData:'NO RENEWALS THIS MONTH'
  };
  years = [
    {isSelected:true,year:'1 YEAR'},
    {isSelected:false,year:'5 YEARS'},
    {isSelected:false,year:'10 YEARS'},
    {isSelected:false,year:'15 YEARS'},
    {isSelected:false,year:'20 YEARS'},
    {isSelected:false,year:'25 YEARS'},
    {isSelected:false,year:'30 YEARS'},
    {isSelected:false,year:'35 YEARS'},
    {isSelected:false,year:'40 YEARS'},
    {isSelected:false,year:'45 YEARS'},
    {isSelected:false,year:'50 YEARS'},
  ];
  showSubmenu = false;
  constructor() { }

  ngOnInit() {
    this.tableTitle = [
      ['Product Type','Policy Type'],
      ['Investor Name', 'Company'],
      ['DOC', 'Frequency'],
      ['Renewal Date'],
      ['Amount']
    ];
    console.log(this.years);
  }

  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  onMonthClick(index){
    for (let i = 0; i < this.months.length; i++) {
        if(index === i){
          this.months[i].isClicked=true;
        }else{
          this.months[i].isClicked=false;
        }
    }
  }
}
