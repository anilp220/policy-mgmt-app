import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})

export class HighchartService {
  colors = [
    '#ffb3ba',
    '#ffdfba',
    '#ffffba',
    '#baffc9',
    '#bae1ff',
    '#ff8b94',
    '#ffaaa5',
    '#ffd3b6',
    '#dcedc1',
    '#a8e6cf',
  ];
  constructor() { }
  getDonutChart(data, showSum?, diseases?) {
    return {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        margin: 0,
      },
      title: {
        text: ''
      },
      plotOptions: {
        pie: {
          center: ['50%', '50%']
        }
      },
      tooltip: {
        formatter() {
          return '<b>' + this.point.name + '</b>: ' + this.y;
        }
      },
      series: [{
        data,
        size: '60%',
        innerSize: '60%',
        showInLegend: false,
        type: 'pie',
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '15',
            fontWeight: 'bold'
          },
          formatter() {
            // eslint-disable-next-line max-len
            return showSum ? ('<b>' + this.point.name + '</b> <br>'
              + this.y + (diseases ? ' Diseases' : '')) :
              (this.point.name + '<br>' + this.percentage.toFixed() + '%');
          }
        },
        colors: this.colors
      }],
      legend: {
        enabled: true,
        align: 'left',
        layout: 'horizontal',
      },
      credits: {
        enabled: false
      },
    };
  }

  getAnnualPremiumChart(categories: string[],data: string[]){
    categories =categories.map(cat=>cat.slice(0,3));
    return {
      chart: {
        type: 'bar',
        backgroundColor: 'transparent',
        height:200,
        style:{
        }
      },
      title: {
        text: ''
      },
      xAxis: {
        type:'category',
        categories,
        lineWidth: 0,
   minorGridLineWidth: 0,
   lineColor: 'transparent',
   minorTickLength: 0,
   tickLength: 0,
        title: {
          text: '',
        },
        labels:{
          // overflow: 'justify',
          enabled:true,
          style:{
            fontSize:12,
            backgroundColor:'red',
            color:'black',
          },
        },
        enabled:true,
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
        },
        labels: {
          enabled:false
        }
      },
      tooltip: {
        valuePrefix: 'Rs. '
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            style:{
              fontSize:12
            },
            formatter() {
              // eslint-disable-next-line eqeqeq
              if(this.y != 0) {
                return this.y;
              }
            }
          }
        },
        series: {
          // pointWidth:50,
          // pointPadding: 0
        },
      },
      legend: {
        enabled:false
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Renewal Amount',
          data
        }
      ]
    };
  }

  getLifeTimeSumChart(categories: string[],data: string[]){
    return {
      chart: {
        type: 'bar',
        backgroundColor: 'transparent',
        style:{
        }
      },
      title: {
        text: ''
      },
      xAxis: {
        type:'category',
        categories,
        title: {
          text: '',
        },
        labels:{
          // overflow: 'justify',
          enabled:true,
          style:{
            fontSize:12,
            backgroundColor:'red',
            color:'black',
          }
        },
        enabled:true,
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
        },
        labels: {
          enabled:false
        }
      },
      tooltip: {
        valuePrefix: 'Rs. '
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            style:{
              fontSize:12
            }
          }
        }
      },
      legend: {
        enabled:false
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Renewal Amount',
          data
        }
      ]
    };
  }

  getBarChart(htmlRef) {
    const option: any = {
      type: 'horizontalBar',
      data: {
        labels: [65, 59, 80, 81, 56, 55, 40],
        datasets: [
          {
            label: 'Dataset 1',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: '#6eaee0',
            fill: true,
            borderRadius: 15,
          },
        ]
      },
      options: {
        indexAxis: 'y',
        legend: {
          display: false
        },
        elements: {
          bar: {
            borderWidth: 1,
          }
        },
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart'
          }
        }
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Age',
          },
        }]
      }
    };
    return new Chart(htmlRef, option);
  }

//   getAnnualPremiumChart(htmlRef,labels,data,) {
//     const option: any = {
//       type: 'bar',
//       tooltip: {
//         enabled: true,
//         titleColor:'red'
//     },
//       data: {
//         labels,
//         datasets: [
//           {
//             label: 'Premiun',
//             data,
//             backgroundColor: '#7BC5FF',
//             fill: true,
//             borderRadius: 15,
//           },
//         ]
//       },
//       options: {
//         // indexAxis: 'x',
//         legend: {
//           display: false
//         },
//         // elements: {
//         //   bar: {
//         //     borderWidth: 10,
//         //   }
//         // },
//         responsive: true,
//         plugins: {
//           // title: {
//           //   display: true,
//           // },
//           tooltip: {
//             mode: 'index',
//             intersect: false,
//             enabled:true
//           }
//         }
//       },
//       scales: {
//         // yAxes: [{
//         //   scaleLabel: {
//         //     display: false,
//         //   },
//         // }],
//         xAxes: [{
//           ticks: {
//             display: false //this will remove only the label
//         }
// //this will remove all the x-axis grid lines
//       }]
//       }
//     };
//     return new Chart(htmlRef, option);
//   }
}
