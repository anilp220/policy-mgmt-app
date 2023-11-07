import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Models } from 'src/app/services/models.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.page.html',
  styleUrls: ['./coming-soon.page.scss'],
})
export class ComingSoonPage implements OnInit {
  title: string;
  message: string;
  constructor(private route: ActivatedRoute,
    public models: Models, private router: Router) {
    this.route.queryParams.subscribe(_p => {
      const navParams = this.router.getCurrentNavigation().extras.state;
      if (navParams) {
        this.title = navParams.title;
        this.message = navParams.message;
      }
    });
  }

  ngOnInit() {
  }

}
