import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyDigits]',
})
export class OnlyDigitsDirective {
  @Input() maxLength: number = 9; // longueur max par défaut

  constructor() {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Tab',
    ];

    if (allowedKeys.includes(event.key)) return;

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }

    const input = event.target as HTMLInputElement;
    if (input.value.length >= this.maxLength) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedData = event.clipboardData?.getData('text') || '';
    if (!/^\d+$/.test(pastedData)) {
      event.preventDefault();
    }

    const input = event.target as HTMLInputElement;
    if (input.value.length + pastedData.length > this.maxLength) {
      event.preventDefault();
    }
  }
}
