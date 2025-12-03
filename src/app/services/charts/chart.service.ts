import {Injectable} from '@angular/core';
import {Chart, registerables, ChartConfiguration, Plugin} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);


@Injectable({
  providedIn: 'root'
})

export class ChartService {

  constructor() {
  }

  /**
   * Création générique de charts Chart.js
   * @param canvasId ID du canvas HTML
   * @param type type de chart: 'bar' | 'line' | 'doughnut' | etc.
   * @param data objet data (labels + datasets)
   * @param options options Chart.js (animations, scales, plugins…)
   * @param plugins tableau optional de plugins custom
   */
  createChart(
    canvasId: string,
    type: ChartConfiguration['type'],
    data: ChartConfiguration['data'],
    options?: ChartConfiguration['options'],
    plugins?: Plugin[]
  ): Chart {
    // 🟢 Animation par défaut pour tous les charts
    const animationFix = {
      animations: {
        tension: {
          duration: 900,
          easing: 'easeOutQuad',
          from: 0.5,
          to: 0,
          loop: false
        },
        x: {
          duration: 900,
          easing: 'linear'
        },
        y: {
          duration: 900,
          easing: 'linear'
        }
      },
      transitions: {
        active: {
          animation: {
            duration: 200,
            easing: 'linear'
          }
        }
      }
    };

    const mergedOptions: any = {
      ...animationFix,
      ...options
    };


    // Retour
    return new Chart(canvasId, {
      type,
      data,
      options: mergedOptions,
      plugins: plugins ?? []
    });
  }
}
