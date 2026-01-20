import { Component, ViewChild } from '@angular/core';
// import { ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { UiChartComponent } from '../../../components/shared/ui-chart/ui-chart.component';
import { ChartOptions } from '../../../core/interfaces/apexChartOptions';

@Component({
  selector: 'app-alertes-supervisions',
  imports: [NgApexchartsModule, UiChartComponent],
  templateUrl: './alertes-supervisions.component.html',
  styleUrl: './alertes-supervisions.component.css',
})
export class AlertesSupervisionsComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public AreaChartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;

  constructor() {
    // Area Chart
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
        zoom: {
          enabled: false,
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

    // Donut Chart
    this.AreaChartOptions = {
      series: [35, 25, 12, 25],
      chart: {
        type: 'donut',
        height: 300,
        fontFamily: 'Segoe UI, sans-serif',
        toolbar: {
          show: false,
        },
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

    // Line Chart
    this.lineChartOptions = {
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Segoe UI, sans-serif',
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
        ],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    };
  }
}
