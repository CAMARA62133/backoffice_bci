import { Component, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../../../core/interfaces/apexChartOptions';

@Component({
  selector: 'app-org-dashboard',
  imports: [NgApexchartsModule, ChartComponent],
  templateUrl: './org-dashboard.component.html',
  styleUrl: './org-dashboard.component.css',
})
export class OrgDashboardComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public areaChartOptions: Partial<ChartOptions>;

  constructor() {
    this.areaChartOptions = {
      series: [
        {
          name: 'Operations',
          data: [
            25, 35, 30, 45, 50, 65, 85, 120, 95, 85, 110, 135, 160, 150, 140,
            125, 110, 95, 80, 65, 55, 45, 40, 35,
          ],
        },
      ],

      chart: {
        type: 'area',
        height: 350,
        zoom: { enabled: false },
        toolbar: { show: false },
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
      },

      stroke: {
        curve: 'smooth',
        width: 3,
      },

      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [0, 90, 100],
        },
      },
    };
  }
}
