import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MobileOperator } from '../models/mobile-operator.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-operator-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-operator-detail.component.html',
})
export class MobileOperatorDetailsComponent {
  @Input() operator: MobileOperator | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<MobileOperator>();

  onClose() {
    this.close.emit();
  }

  onEdit() {
    if (this.operator) {
      this.edit.emit(this.operator);
    }
  }
}
