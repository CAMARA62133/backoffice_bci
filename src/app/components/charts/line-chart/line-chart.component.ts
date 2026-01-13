import { Component } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import {ApexchartsModule} from '../../../charts/apexcharts/apexcharts.module';

@Component({
  selector: 'app-line-chart',
  imports: [ApexchartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
  standalone: true
})
export class LineChartComponent {

  series: ApexAxisChartSeries = [
    {
      name: 'Ventes',
      data: [10, 41, 35, 51, 49, 62, 69]
    }
  ];

  chart: ApexChart = {
    type: 'line',
    height: 350
  };

  title: ApexTitleSubtitle = {
    text: 'Statistiques de ventes'
  };
}
