import {AfterViewInit, Component, OnInit} from '@angular/core';

import {Chart, registerables} from "chart.js"

Chart.register(...registerables);
Chart.defaults.backgroundColor = '#343473';
Chart.defaults.borderColor = '#CCC';
Chart.defaults.color = '#000';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './agent-dashboard.component.html',
  styleUrl: './agent-dashboard.component.css',
})
export class AgentDashboardComponent implements OnInit {
  data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart: any, args: any, options: any) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

  public config: any = {
    type: 'doughnut',
    data: this.data,
    options: {
      plugins: {
        customCanvasBackgroundColor: {
          color: 'lightGreen',
        }
      }
    },
    plugins: [this.plugin],
  }

  chart: any;

  ngOnInit() {
    this.chart = new Chart('MyChart', this.config)
  }

}
