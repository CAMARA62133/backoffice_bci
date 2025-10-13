import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-alertes',
  imports: [CommonModule],
  templateUrl: './alertes.component.html',
  styleUrl: './alertes.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertesComponent {
  constructor() {}
}
