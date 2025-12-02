import {Component} from '@angular/core';
import {DataTableDirective} from '../../../directives/data-table/data-table.directive';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-entreprises',
  imports: [
    DataTableDirective
  ],
  templateUrl: './entreprises.component.html',
  styleUrl: './entreprises.component.css'
})
export class EntreprisesComponent {
  constructor(private router: Router) {
  }

  goToFicheEntreprise() {
    this.router.navigate(['fiche-entreprise']);
  }
}
