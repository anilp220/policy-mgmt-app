import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeOfPolicyPageRoutingModule } from './type-of-policy-routing.module';

import { TypeOfPolicyPage } from './type-of-policy.page';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypeOfPolicyPageRoutingModule
  ],
  declarations: [TypeOfPolicyPage, HeaderComponent]
})
export class TypeOfPolicyPageModule { }
