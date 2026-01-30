import { Component, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../../../core/interfaces/apexChartOptions';
import { ChartService } from '../../../services/charts/chart.service';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './agent-dashboard.component.html',
  styleUrl: './agent-dashboard.component.css',
})
export class AgentDashboardComponent {
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

  // ngOnInit() {
  //   this.loadBarChart();
  //   this.loadBarChart2();
  //   this.loadBarChart3();
  //   this.loadHalfDoughnutChart();
  // }

  // // Permet de charger les charts
  // loadBarChart() {
  //   const labels = ['Jan', 'Fev', 'Mars', 'Avril'];

  //   const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: 'Performances',
  //         data: [70, 55, 35, 20],
  //         backgroundColor: 'rgba(52, 52, 115, 0.85)',
  //         hoverBackgroundColor: 'rgba(52, 52, 115, 0.50)',
  //         borderWidth: 1,
  //         datalabels: {
  //           display: true,
  //           color: '#fff',
  //         },
  //       },
  //     ],
  //   };

  //   const options = {
  //     scales: {
  //       y: { beginAtZero: true },
  //     },

  //     plugins: {
  //       title: {
  //         display: true,
  //         text: 'Performances par categorie',
  //         padding: {
  //           top: 10,
  //           bottom: 10,
  //         },
  //       },
  //       subtitle: {
  //         display: true,
  //         text: 'Categories par categorie',
  //         textStyle: {
  //           color: 'white',
  //         },
  //       },
  //     },
  //   };

  //   this.chart = this.chartService.createChart('myChart', 'bar', data, options);
  // }

  // loadBarChart2() {
  //   const labels = ['Daniel', 'Djoulde', 'Robert'];

  //   const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: 'Performances',
  //         data: [70, 42, 20],
  //         backgroundColor: [
  //           'rgba(40, 167, 69, 0.85)',
  //           'rgba(52, 52, 115, 0.85)',
  //           'rgba(255, 193, 7, 0.85)',
  //         ],
  //         hoverBackgroundColor: [
  //           'rgba(40, 167, 69, 0.50)',
  //           'rgba(52, 52, 115, 0.50)',
  //           'rgba(255, 193, 7, 0.50)',
  //         ],
  //         borderWidth: 1,
  //         datalabels: {
  //           display: true,
  //           color: '#fff',
  //         },
  //       },
  //     ],
  //   };

  //   const options = {
  //     responsive: false,
  //     maintainAspectRatio: false,
  //     layout: {
  //       padding: 0,
  //     },
  //     scales: {
  //       y: { beginAtZero: true },
  //     },

  //     plugins: {
  //       datalabels: {
  //         display: true,
  //         color: '#fff',
  //         formatter: (value: number) => value + '%',
  //       },

  //       title: {
  //         display: true,
  //         text: 'Performances par categorie',
  //         padding: {
  //           top: 10,
  //           bottom: 10,
  //         },
  //       },

  //       subtitle: {
  //         display: true,
  //         text: 'Categories par categorie',
  //         textStyle: {
  //           color: 'white',
  //         },
  //       },

  //       legend: {
  //         display: true,
  //       },
  //     },
  //   };

  //   this.chart = this.chartService.createChart(
  //     'myChart2',
  //     'doughnut',
  //     data,
  //     options,
  //   );
  // }

  // loadBarChart3() {
  //   const labels = ['Daniel', 'Djoulde', 'Robert'];

  //   const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: 'Demandes traitées',
  //         data: [65, 42, 20],
  //         backgroundColor: 'rgba(52, 52, 115, 0.85)',
  //         hoverBackgroundColor: 'rgba(52, 52, 115, 0.50)',
  //         datalabels: {
  //           color: '#fff',
  //         },
  //       },

  //       {
  //         label: 'Demandes en attente',
  //         data: [30, 20, 15],
  //         backgroundColor: 'rgba(40, 167, 69, 0.85)',
  //         hoverBackgroundColor: 'rgba(40, 167, 69, 0.50)',
  //         datalabels: {
  //           color: '#fff',
  //         },
  //       },
  //     ],
  //   };

  //   const options = {
  //     responsive: true,
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //         ticks: { font: { size: 12 } },
  //       },
  //       x: {
  //         ticks: { font: { size: 12 } },
  //       },
  //     },

  //     plugins: {
  //       datalabels: {
  //         display: true,
  //         color: '#fff',
  //         formatter: (value: number) => value + '%',
  //       },

  //       title: {
  //         display: true,
  //         text: 'Statistiques par agent',
  //         padding: { top: 10, bottom: 10 },
  //       },

  //       legend: {
  //         display: true,
  //         labels: {
  //           font: { size: 13 },
  //         },
  //       },
  //     },
  //   };

  //   this.chart = this.chartService.createChart(
  //     'myChart3',
  //     'bar',
  //     data,
  //     options,
  //   );
  // }

  // loadHalfDoughnutChart() {
  //   const data = {
  //     labels: ['SLA Respecté', 'Non Respecté'],
  //     datasets: [
  //       {
  //         data: [75, 25],
  //         backgroundColor: [
  //           'rgba(40, 167, 69, 0.85)', // vert
  //           'rgba(101, 101, 101, 0.85)', // rouge léger
  //         ],
  //         hoverBackgroundColor: [
  //           'rgba(40, 167, 69, 0.55)',
  //           'rgba(101, 101, 101, 0.55)',
  //         ],
  //         borderWidth: 0,
  //       },
  //     ],
  //   };

  //   const options = {
  //     responsive: false,
  //     maintainAspectRatio: false,
  //     circumference: 180, // demi-cercle
  //     rotation: -90, // orientation du demi-cercle
  //     plugins: {
  //       legend: { display: false },
  //       title: {
  //         display: true,
  //         text: 'Respect des SLA',
  //         font: { size: 16 },
  //       },
  //       datalabels: {
  //         color: '#343473',
  //         font: { weight: 500, size: 18 },
  //         formatter: (value: number) => value + '%',
  //       },
  //     },
  //   };

  //   this.chart = this.chartService.createChart(
  //     'myHalfChart',
  //     'doughnut',
  //     data,
  //     options,
  //   );
  // }
}
