import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
})
export class FormInput {
  @Input() control: FormControl | null = null;
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Input() errorMessage: string = 'Champ obligatoire';
  @Input() successMessage: string = 'Parfait !';
}
