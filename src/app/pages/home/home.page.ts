import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    // this.loadSimplePieChart();
  }
  // loadSimplePieChart() {
  //   this.pieChart = {
  //     chartType: 'PieChart',
  //     dataTable: [
  //       ['Task', 'Hours per Day'],
  //       ['Work', 11],
  //       ['Eat', 2],
  //       ['Commute', 2],
  //       ['Watch TV', 2],
  //       ['Sleep', 7]
  //     ],
  //     //opt_firstRowIsData: true,
  //     options: {
  //       title: 'Tasks',
  //       height: 600,
  //       width: '100%'
  //     },
  //   };
  // }

  redirectTo(path) {
    this.navCtrl.navigateRoot(path);
  }
}
