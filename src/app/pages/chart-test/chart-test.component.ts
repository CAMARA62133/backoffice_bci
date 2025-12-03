import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgApexchartsModule} from 'ng-apexcharts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-chart-test',
  imports: [NgApexchartsModule],
  templateUrl: './chart-test.component.html',
  styleUrl: './chart-test.component.css'
})

export class ChartTestComponent implements AfterViewInit {
  @ViewChild('chart') chart?: ChartComponent;

  // ⚡ Initialise toutes les propriétés directement
  public chartOptions: ChartOptions = {
    series: [
      {name: 'series1', data: [31, 40, 28, 51, 42, 109, 100]},
      {name: 'series2', data: [11, 32, 45, 32, 34, 52, 41]}
    ],
    chart: {type: 'area', height: 350},
    dataLabels: {enabled: false},
    stroke: {curve: 'smooth'},
    xaxis: {
      type: 'datetime',
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z"
      ]
    },
    tooltip: {x: {format: 'dd/MM/yy HH:mm'}},
  };

  ngAfterViewInit() {
    // vérifie que le chart existe avant de l'utiliser
    if (this.chart) {
      console.log('Chart ready:', this.chart);
    } else {
      console.log("Chart ins't ready:", this.chart);
    }
  }
}
