import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/authService/auth.service';

@Component({
  selector: 'app-dg-dga-dashboard',
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './dg-dga-dashboard.component.html',
  styleUrls: ['./dg-dga-dashboard.component.css'],
})
export class DgDgaDashboardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;

  selectedPeriod: string = 'week';

  // Chart configurations
  evolutionChart: any;
  statusChart: any;
  typesChart: any;
  monthlyTrend: any;

  recentTransactions = [
    {
      id: 'TRX-001',
      company: 'TechCorp SARL',
      amount: 12500,
      status: 'validé',
      date: new Date(),
    },
    {
      id: 'TRX-002',
      company: 'Finance Plus',
      amount: 8900,
      status: 'validé',
      date: new Date(Date.now() - 3600000),
    },
    {
      id: 'TRX-003',
      company: 'Retail Store',
      amount: 3400,
      status: 'en attente',
      date: new Date(Date.now() - 7200000),
    },
    {
      id: 'TRX-004',
      company: 'Logistics Pro',
      amount: 15600,
      status: 'validé',
      date: new Date(Date.now() - 10800000),
    },
    {
      id: 'TRX-005',
      company: 'Services Hub',
      amount: 4500,
      status: 'rejeté',
      date: new Date(Date.now() - 14400000),
    },
  ];

  constructor(private authService: AuthService) {
    this.initEvolutionChart();
    this.initStatusChart();
    this.initMonthlyTrend();
  }
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    return this.authService.userInfo();
  }
  initEvolutionChart() {
    this.evolutionChart = {
      series: [
        {
          name: 'Transactions',
          data: [42, 58, 67, 89, 112, 134, 156, 178, 195, 210, 228, 245],
        },
      ],
      chart: {
        type: 'area',
        height: 380,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      colors: ['#343473'],
      stroke: { curve: 'smooth', width: 3 },
      dataLabels: { enabled: false },
      grid: { borderColor: '#f1f1f1', strokeDashArray: 4 },
      markers: {
        size: 4,
        colors: ['#343473'],
        strokeColors: '#fff',
        strokeWidth: 2,
      },
      xaxis: {
        categories: [
          'Jan',
          'Fév',
          'Mar',
          'Avr',
          'Mai',
          'Juin',
          'Juil',
          'Aoû',
          'Sep',
          'Oct',
          'Nov',
          'Déc',
        ],
        labels: { style: { colors: '#6c757d' } },
      },
      yaxis: {
        title: { text: 'Nombre de transactions', style: { color: '#6c757d' } },
        labels: { style: { colors: '#6c757d' } },
      },
      tooltip: {
        theme: 'light',
        y: { formatter: (val: number) => val + ' transactions' },
      },
      title: {
        text: 'Évolution annuelle',
        align: 'left',
        style: { fontSize: '14px', color: '#666' },
      },
    };
  }

  initStatusChart() {
    this.statusChart = {
      series: [11892, 234, 719],
      labels: ['Validées', 'En attente', 'Rejetées'],
      chart: { type: 'donut', height: 320 },
      colors: ['#28a745', '#ffc107', '#dc3545'],
      dataLabels: {
        enabled: true,
        formatter: (val: number, opts: any) => {
          return opts.w.globals.series[opts.seriesIndex].toLocaleString();
        },
        style: { colors: ['#fff'], fontSize: '12px' },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                formatter: () => '12,845',
              },
            },
          },
        },
      },
      legend: { position: 'bottom', horizontalAlign: 'center' },
      tooltip: {
        y: {
          formatter: (val: number) => val.toLocaleString() + ' transactions',
        },
      },
    };
  }

  initMonthlyTrend() {
    this.monthlyTrend = {
      series: [
        {
          name: '2024',
          data: [120, 145, 168, 189, 210, 234, 256, 278, 295, 312, 328, 345],
        },
        {
          name: '2023',
          data: [98, 112, 125, 142, 158, 172, 188, 202, 218, 234, 248, 262],
        },
      ],
      chart: { type: 'line', height: 350, toolbar: { show: false } },
      colors: ['#343473', '#28a745'],
      stroke: { curve: 'smooth', width: 3 },
      dataLabels: { enabled: false },
      fill: {
        type: 'gradient',
        gradient: { shadeIntensity: 0.1, opacityFrom: 0.7, opacityTo: 0.3 },
      },
      xaxis: {
        categories: [
          'Jan',
          'Fév',
          'Mar',
          'Avr',
          'Mai',
          'Juin',
          'Juil',
          'Aoû',
          'Sep',
          'Oct',
          'Nov',
          'Déc',
        ],
      },
      yaxis: { title: { text: 'Transactions' } },
      tooltip: { theme: 'light' },
      legend: { position: 'top', horizontalAlign: 'right' },
    };
  }

  getPeriodLabel(): string {
    const labels = {
      day: "aujourd'hui",
      week: 'cette semaine',
      month: 'ce mois',
    };
    return (
      labels[this.selectedPeriod as keyof typeof labels] || 'cette semaine'
    );
  }

  changePeriod(period: string) {
    this.selectedPeriod = period;
    const dataMap = {
      day: [42, 58, 67, 89, 112, 134, 156],
      week: [245, 268, 289, 312, 334, 356, 378],
      month: [156, 178, 195, 210, 228, 245, 268, 289, 312, 334, 356, 378],
    };

    const categories = {
      day: ['00h', '04h', '08h', '12h', '16h', '20h', '24h'],
      week: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      month: [
        'Jan',
        'Fév',
        'Mar',
        'Avr',
        'Mai',
        'Juin',
        'Juil',
        'Aoû',
        'Sep',
        'Oct',
        'Nov',
        'Déc',
      ],
    };

    this.evolutionChart = {
      ...this.evolutionChart,
      series: [
        { name: 'Transactions', data: dataMap[period as keyof typeof dataMap] },
      ],
      xaxis: {
        ...this.evolutionChart.xaxis,
        categories: categories[period as keyof typeof categories],
      },
    };
  }

  refreshData() {
    // Simuler l'actualisation des données
    console.log('Données actualisées');
  }
}
