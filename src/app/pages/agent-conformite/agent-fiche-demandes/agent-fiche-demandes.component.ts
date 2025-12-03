import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DemandeService} from '../../../services/agent-conformite/demande/demande.service';
import {ToastrService} from 'ngx-toastr';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-agent-fiche-demandes',
  imports: [
    NgIf,
    NgForOf,
    CurrencyPipe
  ],
  templateUrl: './agent-fiche-demandes.component.html',
  styleUrl: './agent-fiche-demandes.component.css'
})
export class AgentFicheDemandesComponent implements OnInit {
  id!: string;
  demande!: any;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private demandeService: DemandeService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      console.log(this.id);
      this.loadDemande(this.id);
    })
  }


  // Private function to load the subscription liste
  private loadDemande(id: string) {
    this.isLoading = true;
    this.demandeService.oneDemandeSouscription(id).subscribe({
      next: (res) => {
        if (res?.status === 200) {
          this.demande = res?.data[0]
          console.log("ID:", this.id);
          console.log("Detail: " + this.demande);
        } else {
          if (res?.error?.message === "Unauthenticated.") {
            this.toastr.error("Votre session a expirée", '', {positionClass: 'toast-top-right'});
            this.router.navigate(['/login']);
          }
        }
        this.isLoading = false;
        console.log("res", res)
      },


      error: (err) => {
        this.toastr.error("Une erreur interne est survenue.", '', {positionClass: 'toast-top-right'});
        console.log("err demandes:", err);
        this.isLoading = false;
      }
    })
  }
}
