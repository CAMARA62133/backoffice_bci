import {Injectable} from '@angular/core';
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
  ChartType,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  annotations?: ApexAnnotations;
  colors?: string[];
  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  labels?: string[];
  legend?: ApexLegend;
  fill?: ApexFill;
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
  grid?: ApexGrid;
  states?: ApexStates;
  title?: ApexTitleSubtitle;
  subtitle?: ApexTitleSubtitle;
  theme?: ApexTheme;
  markers?: ApexMarkers;
};

@Injectable({
  providedIn: 'root',
})
export class ChartService {

  /**
   * Fonction générique pour defaults communs
   * @param type le type de la chart
   * @param height la hauteur de la chart
   */
  private getDefaultChart(type: ChartType, height: number = 300): ApexChart {
    return {
      type,
      height,
      fontFamily: 'Segoe UI, sans-serif',
      toolbar: {show: false},
      animations: {enabled: true, speed: 800},
    }
  }

  /**
   * Options pour un graphique en donnut (donnut chart)
   * @param series les series
   * @param labels les titres
   * @param colors les couleurs
   */
  getDonutOptions(series: number[], labels: string[], colors: string[]): ChartOptions {
    return {
      series,
      chart: this.getDefaultChart('donut'),
      labels,
      colors,
      dataLabels: {
        enabled: true,
        formatter: (val: any) => val.toFixed(1) + '%',
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {chart: {width: 200}, legend: {position: 'bottom'}},
        },
      ],
    };
  }

  /**
   * Area chart
   * @param series
   * @param categories
   * @param yTitle
   * @param xTitle
   */
  getAreaOptions(series: ApexAxisChartSeries, categories: string[], yTitle: string, xTitle: string): Partial<ChartOptions> {
    return {
      series,
      chart: this.getDefaultChart('area'),
      dataLabels: {enabled: false},
      stroke: {curve: 'smooth', width: 2},
      xaxis: {categories, title: {text: xTitle}},
      yaxis: {title: {text: yTitle}},
      fill: {
        type: 'gradient',
        gradient: {shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3},
      },
      legend: {position: 'top'},
      grid: {borderColor: '#e7e7e7'},
    };
  }

  // Pie (similaire à Donut mais sans trou)
  getPieOptions(series: number[], labels: string[], colors: string[]): Partial<ChartOptions> {
    return {
      series,
      chart: this.getDefaultChart('pie'),
      labels,
      colors,
      dataLabels: {enabled: true},
      legend: {position: 'bottom'},
    };
  }

  // Bar
  getBarOptions(
    series: ApexAxisChartSeries,
    categories: string[],
    horizontal = false
  ): Partial<ChartOptions> {
    return {
      series,
      chart: this.getDefaultChart('bar'),
      plotOptions: {bar: {horizontal}},
      xaxis: {categories},
      dataLabels: {enabled: false},
      legend: {position: 'top', horizontalAlign: "center"},
    };
  }

  // Line
  getLineOptions(series: ApexAxisChartSeries, categories: string[]): Partial<ChartOptions> {
    return {
      series,
      chart: this.getDefaultChart('line'),
      stroke: {curve: 'smooth', width: 2},
      xaxis: {categories},
      markers: {size: 4},
      legend: {position: 'top'},
    };
  }

  // Column (variante de Bar, vertical par défaut)
  getColumnOptions(series: ApexAxisChartSeries, categories: string[], vertical: boolean = false): Partial<ChartOptions> {
    return this.getBarOptions(series, categories, vertical); // Vertical bars
  }

  // Radar
  getRadarOptions(series: ApexAxisChartSeries, labels: string[]): Partial<ChartOptions> {
    return {
      series,
      chart: this.getDefaultChart('radar'),
      labels,
      plotOptions: {radar: {polygons: {strokeColors: '#e9e9e9'}}},
      legend: {position: 'top'},
    };
  }

  // Polar Area
  getPolarAreaOptions(series: number[], labels: string[]): Partial<ChartOptions> {
    return {
      series,
      chart: this.getDefaultChart('polarArea'),
      labels,
      stroke: {width: 1},
      fill: {opacity: 0.8},
      legend: {position: 'bottom'},
    };
  }

  // RadialBar
  getRadialBarOptions(series: number[], labels: string[]): Partial<ChartOptions> {
    return {
      series,
      chart: this.getDefaultChart('radialBar'),
      labels,
      plotOptions: {radialBar: {hollow: {size: '70%'}}},
      legend: {position: 'bottom'},
    };
  }

  // Mixed (ex: Line + Bar)
  getMixedOptions(series: ApexAxisChartSeries, categories: string[]): Partial<ChartOptions> {
    return {
      series,
      chart: this.getDefaultChart('line'), // Base sur line, mais series peuvent mixer types
      xaxis: {categories},
      legend: {position: 'top'},
    };
  }

  // Funnel
  // getFunnelOptions(series: number[], labels: string[]): Partial<ChartOptions> {
  //   return {
  //     series: [{ name: 'Funnel', data: series }],
  //     chart: this.getDefaultChart('funnel'),
  //     plotOptions: { pyramid: { show: false } }, // Pour funnel-like
  //     labels,
  //     legend: { position: 'top' },
  //   };
  // }
  //
  // // Slope (custom Line avec pente accentuée)
  // getSlopeOptions(series: ApexAxisChartSeries, categories: string[]): Partial<ChartOptions> {
  //   return {
  //     series,
  //     chart: this.getDefaultChart('line'),
  //     stroke: { curve: 'straight', width: 3 }, // Straight pour slope-like
  //     xaxis: { categories },
  //     markers: { size: 0 }, // Pas de markers pour un slope pur
  //     legend: { position: 'top' },
  //   };
  // }
}
