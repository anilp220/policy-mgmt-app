/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-life-insurance-card',
  templateUrl: './life-insurance-card.component.html',
  styleUrls: ['./life-insurance-card.component.scss'],
})
export class LifeInsuranceCardComponent implements OnInit {
  @Input() data = [];
  @Input() title;
  constructor() { }

  ngOnInit() {
    console.log(this.data);
    console.log(this.title);
  }

  gotoDetail(item) {
    console.log(item);
  }
}
