import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {ChartService} from '../../services/charts/chart.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  chart!: Chart;

  constructor(private chartService: ChartService) {
  }

  ngOnInit() {
    // this.loadAreaChart();
  }
}
