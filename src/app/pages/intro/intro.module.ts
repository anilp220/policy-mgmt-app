import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroPageRoutingModule } from './intro-routing.module';

import { IntroPage } from './intro.page';
import { Intro1Page } from './intro1/intro1.page';
import { Intro2Page } from './intro2/intro2.page';
import { Intro3Page } from './intro3/intro3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule
  ],
  declarations: [IntroPage, Intro1Page, Intro2Page, Intro3Page]
})
export class IntroPageModule { }
