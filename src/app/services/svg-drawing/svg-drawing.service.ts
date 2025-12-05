import { Injectable } from '@angular/core';
import {SvgCircle, SvgElement, SvgLine, SvgRect} from '../../core/models/svg-model';

@Injectable({
  providedIn: 'root'
})
export class SvgDrawingService {
  generateSvg(elements: SvgElement[]) {
    let content = '';

    elements.forEach(el => {
      if (el.type === 'circle') content += this.drawCircle(el);
      if (el.type === 'rect') content += this.drawRect(el);
      if (el.type === 'line') content += this.drawLine(el);
    });

    return `
      <svg width="100%" height="100%" style="position:absolute; top:0; left:0;">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#343473"></polygon>
          </marker>
        </defs>
        ${content}
      </svg>
    `;
  }

  private drawCircle(el: SvgCircle): string {
    return `
      <g transform="translate(${el.x}, ${el.y})" data-step-id="${el.id}" style="cursor:pointer;">
        <circle r="${el.radius}" cx="0" cy="0" fill="${el.fill}" stroke="#fff" stroke-width="2"></circle>
        <text x="0" y="5" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
            ${el.label}
        </text>
      </g>
    `;
  }

  private drawRect(el: SvgRect): string {
    const labels = Array.isArray(el.label)
      ? el.label.map((t, i) => `<tspan x="0" dy="${i === 0 ? 0 : '1.2em'}">${t}</tspan>`).join('')
      : `<tspan x="0" dy="0">${el.label}</tspan>`;

    return `
      <g transform="translate(${el.x}, ${el.y})" data-step-id="${el.id}" style="cursor:pointer;">
        <rect x="${-el.width / 2}" y="${-el.height / 2}" width="${el.width}"
              height="${el.height}" rx="${el.rx ?? 8}" fill="${el.fill}"
              stroke="#ffffff" stroke-width="2"></rect>
        <text text-anchor="middle" fill="white" font-size="12" font-weight="bold" y="-4">
          ${labels}
        </text>
      </g>
    `;
  }


  private drawLine(el: SvgLine): string {
    return `
      <line x1="${el.x1}" y1="${el.y1}" x2="${el.x2}" y2="${el.y2}"
            stroke="#343473" stroke-width="2" marker-end="url(#arrowhead)"></line>
    `;
  }
}
