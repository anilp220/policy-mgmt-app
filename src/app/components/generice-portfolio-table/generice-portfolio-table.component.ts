import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'generice-portfolio-table',
  templateUrl: './generice-portfolio-table.component.html',
  styleUrls: ['./generice-portfolio-table.component.scss'],
})
export class GenericePortfolioTableComponent implements OnInit {

  @Input() tableTitle: any;
  @Input() tableData: any;
  @Output() gotoDetailEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    console.log(this.tableTitle, this.tableData);
  }

  gotoDetail(data) {
    this.gotoDetailEvent.emit(data);
  }


}
