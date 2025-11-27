import { Component } from '@angular/core';
import {DataTableDirective} from '../../../directives/data-table/data-table.directive';

@Component({
  selector: 'app-entreprises',
  imports: [
    DataTableDirective
  ],
  templateUrl: './entreprises.component.html',
  styleUrl: './entreprises.component.css'
})
export class EntreprisesComponent {

}
