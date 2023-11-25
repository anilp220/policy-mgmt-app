/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable eqeqeq */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { CorporateInsuranceService } from 'src/app/services/collection-services/corporate-insurance.service';
import { EquitiesService } from 'src/app/services/collection-services/equities.service';
import { FixedDepositService } from 'src/app/services/collection-services/fixed-deposit.service';
import { HealthInsuranceService } from 'src/app/services/collection-services/health-insurance.service';
import { LifeInsuranceService } from 'src/app/services/collection-services/life-insurance.service';
import { LoanService } from 'src/app/services/collection-services/loan.service';
import { MutualFundService } from 'src/app/services/collection-services/mutual-fund.service';
import { VehicleInsuranceService } from 'src/app/services/collection-services/vehicleInsurance.service';
import { Models } from 'src/app/services/models.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  searchStr;
  filteredArr = [];
  searchKey = '';
  matches: string[];
  isRecording: boolean;
  constructor(
    private navCtrl: NavController,
    private ci: CorporateInsuranceService,
    private equity: EquitiesService,
    private fd: FixedDepositService,
    private hi: HealthInsuranceService,
    private li: LifeInsuranceService,
    private mf: MutualFundService,
    private vi: VehicleInsuranceService,
    private models: Models,
    private loan: LoanService,
    private userService: UserService,
    private speechRecognition: SpeechRecognition,
    private cdr: ChangeDetectorRef,
    private plt: Platform,
    private appService: AppService,
  ) { }

  ngOnInit() {
    console.log(this.userService.allCollections);
    this.getPermission();
  }

  onClick(path) {
    this.navCtrl.navigateForward('tabs/' + path);
  }

  handleInput(event?) {
    if (event) {
      this.searchStr = event.target.value;
    }
    if (this.searchStr == '') {
      this.filteredArr = [];
    }
    if (!this.searchStr.trim().length) {
      this.searchStr = '';
      return;
    }
    this.filteredArr = [];
    const allColls = this.userService.allCollections;
    const allColsArr = [];
    for (const key in allColls) {
      if (Object.prototype.hasOwnProperty.call(allColls, key)) {
        const element: any[] = allColls[key];
        element.forEach(e => {
          e.colName = key;
          allColsArr.push(e);
        });
      }
    }
    const searchStr = this.searchStr.toLowerCase();
    this.filteredArr = allColsArr.filter(item => {
      let companyName = item.company?.name || item.company?.identifier || item.companyName || item.insuranceCompany || item.company;
      companyName = companyName?.toLowerCase();
      const policyNo = item.policyNo || item.policyNumber;
      item.searchKey = companyName || policyNo;
      return companyName?.indexOf(searchStr) > -1 || policyNo?.indexOf(searchStr) > -1;
    });
  }

  getSearchName(item) {
    return item.policyNo || item.policyNumber || 'item';
  }

  gotoPolicy(item) {
    this.searchStr = '';
    this.filteredArr = [];
    let itemDetails;
    let pageTitle;
    let investorName;
    switch (item.colName) {
      case this.models.collections.corporateInsurance:
        itemDetails = this.ci.getDetails(item);
        pageTitle = this.models.titles.corporateInsurance;
        investorName = item.investorName;
        break;
      case this.models.collections.equities:
        itemDetails = this.equity.getDetails(item);
        investorName = item.investorName;
        pageTitle = this.models.titles.equities;
        break;
      case this.models.collections.fixedDeposit:
        itemDetails = this.fd.getDetails(item);
        pageTitle = this.models.titles.fixedDeposit;
        investorName = item.firstholder;
        break;
      case this.models.collections.lifeInsurance:
        itemDetails = this.li.getDetails(item);
        pageTitle = this.models.titles.lifeInsurance;
        investorName = item.nameOfLifeInsured;
        break;
      case this.models.collections.loans:
        itemDetails = this.loan.getDetails(item);
        pageTitle = this.models.titles.loans;
        investorName = item.investorName;
        break;
      case this.models.collections.mediclaim:
        itemDetails = this.hi.getDetails(item);
        pageTitle = this.models.titles.mediclaim;
        investorName = item.investorName;
        break;
      case this.models.collections.mutualFund:
        itemDetails = this.mf.getDetails(item);
        pageTitle = this.models.titles.mutualFund;
        investorName = item.investorName;
        break;
      case this.models.collections.vehicleInsurance:
        itemDetails = this.vi.getDetails(item);
        pageTitle = this.models.titles.vehicleInsurance;
        investorName = item.nameOfOwner;
        break;
    }
    this.appService.gotoPolicyDetail(itemDetails, pageTitle, investorName, item);
  }


  isIos() {
    return this.plt.is('ios');
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }

  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }

  startListening() {
    const options = {
      language: 'en-US'
    };
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.searchStr = this.matches[0];
      this.cdr.detectChanges();
      console.log(this.matches);
    });
    this.isRecording = true;
  }
}
