import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  getStarted = false;
  isLastSlide = false;
  constructor(private router: Router, private appService: AppService) {
    // if (this.storage.get('introComplete')) {
    //   this.appService.navigateRoot('login')
    // }
  }

  ngOnInit() {
    console.log('Intro init');
  }

  finish() {
    this.appService.setDataToLocal('introComplete', true);
    // .then(() => {
    this.router.navigateByUrl('login-signup');
    // });
  }

  next() {
    this.slides.slideNext();
  }

  ionSlideTouchEnd() {
    console.log('ionSlideTouchEnd');
    this.slides.getActiveIndex().then(res => {
      console.log(res);
      if (res === 2) {
        this.isLastSlide = true;
      } else {
        this.isLastSlide = false;
      }
    });
  }
}
