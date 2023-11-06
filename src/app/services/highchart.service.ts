/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

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
  getDonutChart(data, showSum?, diseases?, isAmount?) {
    console.log(data, isAmount);
    const _this = this;
    return {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        margin: 0,
        height: 250
      },
      title: {
        text: ''
      },
      plotOptions: {
        pie: {
          // center: ['50%', '45%'];
        },
      },
      tooltip: {
        formatter() {
          return '<b>' + this.point.name + '</b>: ' + this.y;
        }
      },
      series: [{
        data,
        // size: '60%',
        innerSize: '60%',
        showInLegend: false,
        type: 'pie',
        dataLabels: {
          enabled: true,
          // inside:true,
          // crop: false,
          //       overflow: 'none',

          style: {
            // fontSize: '12',
            fontFamily:'Montserrat',
            // fontWeight: 'bold'
          },
          formatter() {
            // eslint-disable-next-line max-len
            if (!isAmount) {
              return showSum ? (_this.getFirstName(this.point.name) + '<br>'
                + this.y + (diseases ? ' Diseases' : '')) :
                (this.point.name + '<br>' + this.percentage.toFixed() + '%');
            } else {
              return _this.convertAmoutToStr(this.y);
            }
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

  getFirstName(name: string) {
    const split = name.split(' ');
    if (split.length > 1) {
      if (split[0].toLowerCase() === 'mr.'
        || split[0].toLowerCase() === 'mr'
        || split[0].toLowerCase() === 'mrs.'
        || split[0].toLowerCase() === 'mrs') {
        return split[1];
      }
    }
    return split[0];
  }

  getBarChart(categories: string[], data: any[], seriesName: string, yAxisTitle?: string, xAxisTitle?: string, isAmount?: boolean) {
    console.log(categories, data);
    // eslint-disable-next-line no-underscore-dangle
    const _this = this;
    return {
      chart: {
        type: 'bar',
        backgroundColor: 'transparent',
        height: 200,
        style: {
        }
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        categories,
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        title: {
          text: xAxisTitle || '',
          align: 'high',
          rotation: 0,
          textAlign: 'left',
          reserveSpace: false,
          style:{
            fontFamily:'Montserrat'
          }
        },
        labels: {
          // overflow: 'justify',
          enabled: true,
          style: {
            fontSize: 12,
            fontFamily: 'Montserrat',
            backgroundColor: 'red',
            color: 'black',
          },
        },
        enabled: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: yAxisTitle || '',
          style:{
            fontFamily:'Montserrat'
          }
        },
        labels: {
          enabled: false
        }
      },
      tooltip: {
        valuePrefix: 'Rs. '
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            style: {
              fontSize: 12,
              fontFamily: 'Montserrat'
            },
            formatter() {
              if (isAmount) {
                return _this.convertAmoutToStr(this.y);
              }
              return this.y;
            }
          }
        },
        series: {
          // pointWidth:50,
          // pointPadding: 0
        },
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: seriesName,
          data
        }
      ]
    };
  }

  convertAmoutToStr(y) {
    const val = Math.abs(y);
    if (val >= 10000000) { return `${(y / 10000000).toFixed(2)} Crore(s)`; };
    if (val >= 100000) { return `${(y / 100000).toFixed(2)} Lac(s)`; };
    if (val >= 1000) { return `${(y / 1000).toFixed(2)} Thousand(s)`; };
    return y;
  }
}
