import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-mediclaim-card',
  templateUrl: './mediclaim-card.component.html',
  styleUrls: ['./mediclaim-card.component.scss'],
})
export class MediclaimCardComponent implements OnInit {
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
