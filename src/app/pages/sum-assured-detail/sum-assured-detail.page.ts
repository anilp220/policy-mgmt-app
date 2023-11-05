import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { AppService } from 'src/app/services/app.service';
import { HighchartService } from 'src/app/services/highchart.service';
import { LifeInsuranceService } from 'src/app/services/collection-services/life-insurance.service';

@Component({
  selector: 'app-sum-assured-detail',
  templateUrl: './sum-assured-detail.page.html',
  styleUrls: ['./sum-assured-detail.page.scss'],
})
export class SumAssuredDetailPage implements OnInit {
  investorName = '';
  highcharts: typeof Highcharts = Highcharts;
  chartOptions;
  tableTitle = [];
  tableData = {
    item: null,
    data: []
  };
  barChartOptions;
  constructor(private route: ActivatedRoute,
    private highChartService: HighchartService,
    private liService: LifeInsuranceService,
    private appService: AppService,
    private elementRef: ElementRef,
    private router: Router) {
    this.route.queryParams.subscribe(_p => {
      const navParams = this.router.getCurrentNavigation().extras.state;
      if (navParams) {
        const data = JSON.parse(navParams.item);
        this.investorName = navParams.title;
        this.buildGenericeTableData(data);
        this.mapChart(data);
      }
    });
  }

  ngOnInit() {
    const htmlRef = this.elementRef.nativeElement.querySelector('#horizontalBar');
    this.barChartOptions = this.highChartService.getBarChart(htmlRef);//todo update chart
  }

  buildGenericeTableData(data) {
    // const item = { ...this.data[0] };
    this.tableTitle = [
      ['PURPOSE OF INVESTMENT'],
      ['COMPANY', 'PLAN NAME'],
      ['DOC', 'PREMIUM'],
      ['SUM ASSURED'],
      ['NOMINEE']
    ];
    this.tableData.data = [];
    data.forEach(item => {
      this.tableData.item = item;
      this.tableData.data.push([
        [item.purposeOfInvestment],
        [item.company, item.planName],
        [item.doc, item.premium],
        [item.sumAssured],
        [item.nominee]
      ]);
    });
    console.log(this.tableData);
  }

  mapChart(data: any[]) {
    const plotData = [];
    data.forEach(element => {
      plotData.push([element.company, element.sumAssured]);
    });
    console.log(plotData);
    this.chartOptions = this.highChartService.getDonutChart(plotData);
  }

  gotoDetail(item) {
    const data = this.liService.getDetails(item);
    this.appService.gotoPolicyDetail(data, this.investorName, null, item);
  }
}
