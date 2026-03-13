import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  imports:[CommonModule],
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.css'],
})
export class SkeletonLoaderComponent {
  /** Type de skeleton : text, title, input, btn, badge, row, card-title, search */
  @Input() type:
    | 'text'
    | 'text-sm'
    | 'title'
    | 'input'
    | 'btn'
    | 'badge'
    | 'row'
    | 'card-title'
    | 'search' = 'text';

  /** Largeur personnalisée */
  @Input() width?: string;

  /** Hauteur personnalisée */
  @Input() height?: string;
}
