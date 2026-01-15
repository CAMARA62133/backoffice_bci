import { Component, ViewChild } from '@angular/core';
// import { ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexAnnotations,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTheme,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  // series: ApexAxisChartSeries | any;
  // chart: ApexChart | any;
  // xaxis: ApexXAxis | any;
  // yaxis: ApexYAxis | ApexYAxis[];
  // stroke: ApexStroke | any;
  // tooltip: ApexTooltip | any;
  // dataLabels: ApexDataLabels | any;
  // responsive: ApexResponsive[];
  // theme: ApexTheme;
  // markers: ApexMarkers;

  chart: ApexChart | any;
  annotations: ApexAnnotations | any;
  colors: string[] | any;
  dataLabels: ApexDataLabels | any;
  series: ApexNonAxisChartSeries | any;
  stroke: ApexStroke | any;
  labels: string[] | any;
  legend: ApexLegend | any;
  fill: ApexFill | any;
  tooltip: ApexTooltip | any;
  plotOptions: ApexPlotOptions | any;
  responsive: ApexResponsive[] | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | ApexYAxis[] | any;
  grid: ApexGrid | any;
  states: ApexStates | any;
  title: ApexTitleSubtitle | any;
  subtitle: ApexTitleSubtitle | any;
  theme: ApexTheme | any;
  markers: ApexMarkers | any;
};

@Component({
  selector: 'app-alertes-supervisions',
  imports: [NgApexchartsModule],
  templateUrl: './alertes-supervisions.component.html',
  styleUrl: './alertes-supervisions.component.css',
})
export class AlertesSupervisionsComponent {
  @ViewChild('chart') chart!: ChartComponent;
  @ViewChild('chart2') chart2!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public AreaChartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Alertes Critiques',
          data: [31, 40, 28, 51, 42, 109, 100],
          color: '#e74c3c',
        },
        {
          name: 'Alertes Élevées',
          data: [20, 30, 25, 40, 35, 60, 55],
          color: '#f39c12',
        },
        {
          name: 'Alertes Moyennes',
          data: [15, 20, 18, 28, 22, 45, 40],
          color: '#3498db',
        },
        {
          name: 'Alertes Faibles',
          data: [11, 32, 45, 32, 34, 52, 41],
          color: '#00b894',
        },
      ],
      chart: {
        height: 300,
        type: 'area',
        fontFamily: 'Segoe UI, sans-serif',
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          // easing: 'easeinout',
          speed: 800,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      xaxis: {
        categories: ['00h', '04h', '08h', '12h', '16h', '20h', '24h'],
        title: {
          text: 'Heures',
        },
      },
      yaxis: {
        title: {
          text: "Nombre d'alertes",
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        },
      },
      legend: {
        position: 'top',
      },
      grid: {
        borderColor: '#e7e7e7',
      },
    };

    this.AreaChartOptions = {
      series: [35, 25, 12, 25],
      chart: {
        type: 'donut',
        height: 300,
        fontFamily: 'Segoe UI, sans-serif',
      },
      labels: [
        'Modification critique',
        'Export sensible',
        'Accès non autorisé',
        'Anomalie opérationnelle',
      ],
      colors: ['#e74c3c', '#f39c12', '#3498db', '#9b59b6'],
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val.toFixed(1) + '%';
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
      },
    };
  }
}
