import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-insurance-card',
  templateUrl: './vehicle-insurance-card.component.html',
  styleUrls: ['./vehicle-insurance-card.component.scss'],
})
export class VehicleInsuranceCardComponent implements OnInit {
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

