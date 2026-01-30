import { Component, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../../core/interfaces/apexChartOptions';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule, ChartComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public volumeChart: Partial<ChartOptions>;
  public incidentChart: Partial<ChartOptions>;
  public heatmapChart: Partial<ChartOptions>;

  incidentDataByMonth: Record<string, number[]> = {
    JUIN: [4, 3, 3, 2],
    MAI: [6, 2, 1, 3],
    AVRIL: [3, 4, 2, 1],
    MARS: [5, 3, 4, 2],
    FEV: [2, 2, 5, 1],
    JAN: [1, 3, 2, 4],
    DEC: [7, 4, 3, 2],
  };

  selectedMonth: string = 'JUIN';

  constructor() {
    // volume chart configuration
    this.volumeChart = {
      series: [
        {
          name: 'Opérations',
          data: [
            30, 40, 35, 50, 49, 60, 70, 91, 125, 111, 90, 87, 105, 123, 145,
            160, 155, 143, 135, 120, 110, 95, 80, 65,
          ],
        },
      ],
      chart: {
        height: 300,
        type: 'area',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      colors: ['#3182ce'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        },
      },
      xaxis: {
        categories: [
          '00h',
          '01h',
          '02h',
          '03h',
          '04h',
          '05h',
          '06h',
          '07h',
          '08h',
          '09h',
          '10h',
          '11h',
          '12h',
          '13h',
          '14h',
          '15h',
          '16h',
          '17h',
          '18h',
          '19h',
          '20h',
          '21h',
          '22h',
          '23h',
        ],
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (val: any) {
            return val + ' ops';
          },
        },
      },
      legend: {
        visible: false,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + ' opérations';
          },
        },
      },
    };

    // incident chart configuration
    this.incidentChart = {
      series: [4, 3, 3, 2],
      chart: {
        height: 250,
        type: 'donut',
      },
      labels: ['Blocages', 'KYC', 'Accès', 'Autres'],
      colors: ['#e53e3e', '#d69e2e', '#343473', '#3182ce'],
      legend: {
        position: 'right',
        fontSize: '15px',
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
          },
        },
      },
    };

    // heatmap chart configuration
    this.heatmapChart = {
      series: [
        {
          name: 'Lun',
          data: this.generateHeatmapData(),
        },
        {
          name: 'Mar',
          data: this.generateHeatmapData(),
        },
        {
          name: 'Mer',
          data: this.generateHeatmapData(),
        },
        {
          name: 'Jeu',
          data: this.generateHeatmapData(),
        },
        {
          name: 'Ven',
          data: this.generateHeatmapData(),
        },
      ],
      chart: {
        height: 250,
        type: 'heatmap',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#3182ce'],
      xaxis: {
        categories: ['08h', '10h', '12h', '14h', '16h', '18h'],
        labels: {
          style: {
            fontSize: '15px',
          },
        },
      },
    };

    //
    this.incidentChart.series = this.incidentDataByMonth[this.selectedMonth];
  }

  //
  onMonthChange(month: string): void {
    this.selectedMonth = month;
    this.incidentChart = {
      ...this.incidentChart,
      series: [...this.incidentDataByMonth[month]],
    };
  }

  private generateHeatmapData() {
    const data = [];
    for (let i = 0; i < 6; i++) {
      data.push(Math.floor(Math.random() * 90) + 10);
    }
    return data;
  }
}
