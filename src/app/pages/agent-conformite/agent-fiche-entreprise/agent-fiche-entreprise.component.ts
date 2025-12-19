import { Component } from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-agent-fiche-entreprise',
    imports: [
        CurrencyPipe,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './agent-fiche-entreprise.component.html',
  styleUrl: './agent-fiche-entreprise.component.css'
})
export class AgentFicheEntrepriseComponent {

}
