import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-org-list-entreprise',
  imports: [
    RouterLink
  ],
  templateUrl: './org-list-entreprise.component.html',
  styleUrl: './org-list-entreprise.component.css'
})
export class OrgListEntrepriseComponent {


  // Creation d'une entreprise
  openModal(params: string){
    console.log("addEntreprise modal !")
    alert("addEntreprise modal !");
  }
}
