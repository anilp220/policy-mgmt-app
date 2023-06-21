import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingPaymentsPageRoutingModule } from './upcoming-payments-routing.module';

import { UpcomingPaymentsPage } from './upcoming-payments.page';
import { PaymentCardComponent } from 'src/app/components/payment-card/payment-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingPaymentsPageRoutingModule
  ],
  declarations: [UpcomingPaymentsPage, PaymentCardComponent]
})
export class UpcomingPaymentsPageModule { }
