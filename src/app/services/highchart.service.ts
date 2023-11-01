import { ElementRef, Injectable } from '@angular/core';
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

  // getBarChart() {
  //   return {
  //     chart: {
  //       type: 'bar',
  //       backgroundColor: 'transparent',
  //       margin: 0,
  //     },
  //     title: {
  //       text: 'LIFE-TIME SUM ASSURED',
  //       style: {
  //         fontSize: '20px',
  //         padding: '10px'
  //       }
  //     },
  //     xAxis: {
  //       title: {
  //         text: 'Age',
  //         style: {
  //           fontSize: '15px'
  //         }
  //       },
  //       lineColor: 'black'
  //     },
  //     yAxis: {
  //       min: 0,
  //       title: {
  //         text: '',
  //       },
  //       labels: {
  //         overflow: 'justify',
  //         style: {
  //           fontSize: '15px'
  //         }
  //       },
  //       lineWidth: 1,
  //       lineColor: 'black'
  //     },
  //     plotOptions: {
  //       bar: {
  //         dataLabels: {
  //           enabled: true,
  //         },
  //         center: ['5% ,0%']
  //       },
  //     },
  //     legend: {
  //       enabled: false
  //     },
  //     credits: {
  //       enabled: false,
  //     },
  //     series: [
  //       {
  //         name: 'SUM ASSURED',
  //         data: [
  //           ['Shanghai', 24.2],
  //           ['Beijing', 20.8],
  //           ['Karachi', 14.9],
  //           ['Shenzhen', 13.7],
  //           ['Guangzhou', 13.1],
  //         ],
  //         dataLabels: {
  //           enabled: true,
  //           style: {
  //             fontSize: '15',
  //             fontWeight: 'bold'
  //           }
  //         },
  //       },
  //     ],
  //     responsive: {
  //       rules: [{
  //         condition: {
  //           maxWidth: 500
  //         },
  //         chartOptions: {
  //           legend: {
  //             align: 'center',
  //             verticalAlign: 'bottom',
  //             layout: 'horizontal'
  //           },
  //           yAxis: {
  //             labels: {
  //               align: 'left',
  //               x: 0,
  //               y: -5
  //             },
  //             title: {
  //               text: null
  //             }
  //           },
  //           subtitle: {
  //             text: null
  //           },
  //           credits: {
  //             enabled: false
  //           }
  //         }
  //       }]
  //     }
  //   };
  // }

  getBarChart(htmlRef) {
    const option = {
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
}
