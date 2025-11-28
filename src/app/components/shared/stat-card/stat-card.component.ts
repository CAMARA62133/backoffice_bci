import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-stat-card',
  imports: [
    NgClass
  ],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {

  @Input({required: true}) title!: string;
  @Input({required: true}) value!: string | number;

  @Input() icon: string = 'fas fa-info-circle';
  @Input() change: string = '';
  @Input() changeIcon: string = 'fas fa-arrow-up';
  @Input() changeColor: string = 'text-success';

  // Les couleurs de notre card (bg-[nom-couleur])
  @Input() bgColor: 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'dark' = 'primary';
}
