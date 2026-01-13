import { Component } from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-beneficiaire',
  imports: [
    // CurrencyPipe,
    FormsModule,
    // NgForOf,
    // NgIf,
    ReactiveFormsModule,
    DataTablesModule,
    // RouterLink
  ],
  templateUrl: './beneficiaire.component.html',
  styleUrl: './beneficiaire.component.css'
})
export class BeneficiaireComponent {

}
