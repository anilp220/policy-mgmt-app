import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlideInOutAnimation } from 'src/app/animation';
import { AppService } from 'src/app/services/app.service';
import { HealthInsuranceService } from 'src/app/services/health-insurance.service';
import { HighchartService } from 'src/app/services/highchart.service';
import { LiService } from 'src/app/services/li.service';

@Component({
  selector: 'app-rider-sum-assured-detail',
  templateUrl: './rider-sum-assured-detail.page.html',
  styleUrls: ['./rider-sum-assured-detail.page.scss'],
})
export class RiderSumAssuredDetailPage implements OnInit {
  investorName = '';
  diseases = [];
  constructor(private route: ActivatedRoute,
    private appService: AppService,
    private liService: LiService,
    private hiService: HealthInsuranceService,
    private router: Router) {
    this.route.queryParams.subscribe(_p => {
      const navParams = this.router.getCurrentNavigation().extras.state;
      if (navParams) {
        this.diseases = JSON.parse(navParams.item);
        this.investorName = navParams.title;
      }
    });
  }

  ngOnInit() {
  }
  getDetail(item) {
    console.log(item);
    item.coverages = [];
    item.items?.forEach(element => {
      element.diseaseSumAssured=0;
      element.riders?.forEach(rider => {
        rider.coverages?.forEach(cvg => {
          if(cvg.disease===item.disease){
            if (cvg.sumAssured) {
              element.diseaseSumAssured += cvg.sumAssured;
            }
          }
        });
      });
      element.newDisease?.forEach(ele=>{
        if(ele.disease===item.disease){
          if (ele.sumAssured) {
            element.diseaseSumAssured += ele.sumAssured;
          }
        }
      });
      item.coverages.push(element);
    });
    item.showCoverage = !item.showCoverage;
    this.buildGenericeTableData(item);
  }
  toggle(id) {
    document.getElementById(id).hidden = !document.getElementById(id).hidden;
  }

  buildGenericeTableData(item) {
    const tableData = {
      item: [],
      data: []
    };
    item.tableTitle = [
      ['PRODUCT TYPE'],
      [ 'COMPANY','D.O.P.'],
      ['PREMIUM'],
      ['SUM ASSURED'],
      ['NOMINEE']
    ];
    item.coverages.forEach(el => {
      tableData.item.push(el);
      tableData.data.push([
        [el.productType],
        [el?.company, el?.doc],
        [el?.modalPremium],
        [el.diseaseSumAssured],
        [el?.nominee],
      ]);
    });
    item.tableData = {...tableData};
  }

  gotoDetail(item){
    console.log(item);
    let data;
    if(item.productType === 'Health Insurance'){
      data = this.hiService.getDetails(item);
    }else{
      data = this.liService.getDetails(item);
    }
    this.appService.gotoPolicyDetail(data, this.investorName,null, item);
  }
}
