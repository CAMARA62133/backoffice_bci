import {AfterViewInit, Component, OnInit} from '@angular/core';

import { ChartData, ChartOptions, Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './agent-dashboard.component.html',
  styleUrl: './agent-dashboard.component.css',
})
export class AgentDashboardComponent implements OnInit, AfterViewInit {

  public config: any = {
    data: {
      labels: ['Jan', 'Fev', 'Mars', "Avr", 'Mais'],
      datasets: [
        {
          label: "Sales",
          data: ['452', '458', '10'],
          backgroundColor: 'blue',
        },
        {
          label: "Pat",
          data: ['452', '4', '10'],
          backgroundColor: 'red',
        },
      ]
    },
    options: {
      aspectRatio: 1,
    }
  };

  chart: any;

  ngOnInit() {
    this.chart = new Chart('MyChart', this.config);
  }

  ngAfterViewInit() {
    new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: ['A', 'B', 'C'],
        datasets: [
          { label: 'Demo', data: [10, 20, 30], backgroundColor: '#4e73df' }
        ]
      }
    });
  }
}
