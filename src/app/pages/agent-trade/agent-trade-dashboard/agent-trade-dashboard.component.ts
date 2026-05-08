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
        'Transactions validées',
        'Total des transactions',
        'Transactions en attente',
        'Transactions rejetées',
      ],
      colors: ['#28a745', '#343473', '#ffc107', '#FF0B07'],
      dataLabels: {
        enabled: true,
        formatter: (val: number, opts: any) => {
          return opts.w.globals.series[opts.seriesIndex];
        },
        style: { colors: ['#fff'] },
      },
      title: {
        text: 'Statistiques des transactions',
        align: 'center',
      },
      subtitle: {
        text: 'Répartition des transactions',
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
      labels: ['Transactions réussies'],
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
      },

      tooltip: {
        enabled: true,
        y: {
          formatter: (val: number) => `${val}%`,
        },
      },

      title: {
        text: 'Taux de réussite des transactions',
        align: 'center',
        style: { fontSize: '16px' },
      },
      legend: { show: false },
    };

    this.chart3 = {
      series: [
        {
          name: 'Transactions',
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
        categories: ['Dépôts', 'Retraits', 'Transferts', 'Paiements'],
      },
    };

    const rawData = [
      { productName: 'Dépôts', salesAmount: 120, region: 'North' },
      { productName: 'Retraits', salesAmount: 100, region: 'South' },
    ];

    this.chart4 = {
      series: [
        {
          name: 'Transactions',
          data: [120, 100, 80, 140],
        },
      ],

      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false,
        },
      },

      colors: ['#343473'],

      stroke: {
        curve: 'smooth',
        width: 4,
      },

      dataLabels: {
        enabled: false,
      },

      grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 4,
      },

      markers: {
        size: 5,
      },

      xaxis: {
        categories: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi'],
        labels: {
          style: {
            colors: '#6c757d',
          },
        },
      },

      yaxis: {
        labels: {
          style: {
            colors: '#6c757d',
          },
        },
      },

      tooltip: {
        theme: 'light',
      },

      title: {
        text: 'Évolution des transactions',
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: '600',
          color: '#343473',
        },
      },
    };
  }
}
