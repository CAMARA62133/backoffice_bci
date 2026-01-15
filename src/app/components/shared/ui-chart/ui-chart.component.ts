import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { NgApexchartsModule } from "ng-apexcharts";

import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTheme,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent as ApexChartComponent
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  annotations?: ApexAnnotations | any;
  colors?: string[] | any;
  dataLabels?: ApexDataLabels | any;
  stroke?: ApexStroke | any;
  labels?: string[] | any;
  legend?: ApexLegend | any;
  fill?: ApexFill | any;
  tooltip?: ApexTooltip | any;
  plotOptions?: ApexPlotOptions | any;
  responsive?: ApexResponsive[] | any;
  xaxis?: ApexXAxis | any;
  yaxis?: ApexYAxis | ApexYAxis[] | any;
  grid?: ApexGrid | any;
  states?: ApexStates | any;
  title?: ApexTitleSubtitle | any;
  subtitle?: ApexTitleSubtitle | any;
  theme?: ApexTheme | any;
  markers?: ApexMarkers | any;
};

@Component({
  selector: 'app-ui-chart',
  imports: [
    ApexChartComponent,
    NgApexchartsModule
  ],
  templateUrl: './ui-chart.component.html',
  styleUrl: './ui-chart.component.css'
})
export class UiChartComponent implements OnChanges {
  @Input() options!: Partial<ChartOptions>;
  @ViewChild(ApexChartComponent) chart!: ApexChartComponent;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && this.chart) {
      this.chart.updateOptions(this.options, true)
        .then(() => {
          console.log("Chart Options Updated !")
        }).catch((err) => {
        console.log("Error to update chart options.")
      })
    }
  }
}
