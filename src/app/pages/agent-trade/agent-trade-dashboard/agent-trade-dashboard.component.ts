import { Component, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../../../core/interfaces/apexChartOptions';
import { ChartService } from '../../../services/charts/chart.service';

@Component({
  selector: 'app-agent-trade-dashboard',
  imports: [NgApexchartsModule],
  templateUrl: './agent-trade-dashboard.component.html',
  styleUrl: './agent-trade-dashboard.component.css',
})
export class AgentTradeDashboardComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chart1: Partial<ChartOptions>;
  public chart2: Partial<ChartOptions>;
  public chart3!: Partial<ChartOptions>;
  public chart4!: Partial<ChartOptions>;

  // chart!: Chart;

  constructor(private chartService: ChartService) {
    this.chart1 = {
      chart: { type: 'donut', height: 350 },
      series: [28, 45, 67, 4.2],
      labels: [
        'Demandes validées',
        'Total de demandes',
        'Demandes en attentes',
        'Demandes annulées',
      ],
      colors: ['#28a745', '#343473', '#ffc107', '#FF0B07'],
      dataLabels: {
        enabled: true,
        formatter: (val: number, opts: any) => {
          // Math.floor(val) + '%'
          return opts.w.globals.series[opts.seriesIndex];
        },
        style: { colors: ['#fff'] },
      },
      title: {
        text: 'Performances par categorie',
        align: 'center',
      },
      subtitle: {
        text: 'Categories par categorie',
        align: 'center',
        style: { color: 'white' },
      },
      legend: {
        position: 'bottom',
      },
    };

    this.chart2 = {
      chart: {
        type: 'radialBar',
        offsetY: -20,
      },
      series: [95],
      labels: ['SLA Respecté'],
      colors: ['#fff'],

      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
        },
      },

      dataLabels: {
        name: {
          show: true,
          fontSize: '14px',
          color: '#343473',
        },
        value: {
          show: true,
          fontSize: '22px',
          formatter: (val: number) => `${val}%`,
        },
        enabled: true,
        formatter: (val: any) => val + '%',
        style: { colors: ['#fff'] },
        // style: { colors: ['#343473'], fontSize: '18px', fontWeight: 500 },
      },

      tooltip: {
        enabled: true,
        y: {
          formatter: (val: number) => `${val}%`,
        },
      },

      title: {
        text: 'Respect des SLA',
        align: 'center',
        style: { fontSize: '16px' },
      },
      legend: { show: false },
    };

    this.chart3 = {
      series: [
        {
          name: [
            'Incident Technique',
            'Demance access',
            'Question fonctionelle',
            'Demande document',
          ],
          data: [21, 22, 10, 28],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      colors: ['#343473', '#343473', '#343473', '#343473'],
      plotOptions: {
        bar: {
          columnWidth: '50%',
          distributed: true,
        },
      },

      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [
          'Incident Technique',
          'Demance access',
          'Question fonctionelle',
          'Demande document',
        ],
      },
    };

    const rawData = [
      { productName: 'iPhone', salesAmount: 120, region: 'North' },
      { productName: 'Samsung', salesAmount: 100, region: 'South' },
    ];

    this.chart4 = {
      series: [
        {
          data: rawData,
          parsing: {
            x: 'productName',
            y: 'salesAmount',
          },
        },
      ],
    };
  }
}
