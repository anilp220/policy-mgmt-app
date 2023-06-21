import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss'],
})
export class PaymentCardComponent implements OnInit {

  @Input() data;
  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

  payNow(link) {
    console.log(link);
  }
}
