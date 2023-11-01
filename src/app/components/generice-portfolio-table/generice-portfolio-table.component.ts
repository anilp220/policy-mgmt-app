import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'generice-portfolio-table',
  templateUrl: './generice-portfolio-table.component.html',
  styleUrls: ['./generice-portfolio-table.component.scss'],
})
export class GenericePortfolioTableComponent implements OnInit {

  @Input() tableTitle: any[];
  @Input() tableData: any;
  @Output() gotoDetailEvent = new EventEmitter<any>();
  isMutualFund = false;
  constructor() { }

  ngOnInit() {
    console.log(this.tableTitle, this.tableData);
  }

  gotoDetail(data,index?) {
    console.log(data);
    const item = data.item?.length ? data.item[index] : data.item;
    this.gotoDetailEvent.emit(item);
  }

  isReturn(str: string) {
    return str?.toString().includes('%');
  }

  isRed(str: string) {
    str = str.slice(0, str.length - 1);
    return Number(str) < 0;
  }

}
