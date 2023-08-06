/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Models } from 'src/app/services/models.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-life-insurance-card',
  templateUrl: './life-insurance-card.component.html',
  styleUrls: ['./life-insurance-card.component.scss'],
})
export class LifeInsuranceCardComponent implements OnInit {
  @Input() data = [];
  @Input() title;

  constructor(private models: Models, public appService: AppService) {
  }

  ngOnInit() {
    console.log(this.data);
    console.log(this.title);
  }

  gotoDetail(item, title) {
    console.log(item, title);
  }

}
