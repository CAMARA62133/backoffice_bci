import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {DemandeService} from '../../../services/agent-conformite/demande/demande.service';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {DataTablesModule} from 'angular-datatables';
import DataTables from 'datatables.net';
import {Settings} from 'jspdf-autotable';
import type {Config} from 'datatables.net';

@Component({
  selector: 'app-agent-liste-demandes',
  imports: [
    RouterLink,
    NgClass,
    NgForOf,
    NgIf,
    DataTablesModule,
  ],
  templateUrl: './agent-liste-demandes.component.html',
  styleUrl: './agent-liste-demandes.component.css'
})
export class AgentListeDemandesComponent implements OnInit, OnDestroy {
  // === GESTION MULTI-TABLES ===
  dtOptions: Config[] = [];
  dtTriggers: Subject<any>[] = [];

  // ========================================
  // ====== Gestion des tabulations =========
  // ========================================
  activeTab: string = 'attente';

  // Ajouter la classe active
  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  // Savoir si c'est la tab est active
  isActive(tabName: string) {
    return this.activeTab === tabName;
  }

  // ========================================
  isLoadingDemandes: boolean = false;
  demandes: any[] = [];
  traitedDemandes: any[] = [];
  rejectedDemandes: any[] = [];


  // constructeur
  constructor(private demandeService: DemandeService, private toastr: ToastrService, private router: Router) {
  }

  // A l'initialisation
  ngOnInit() {
    // CONFIG TABLE 1
    this.dtOptions[0] = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/fr-FR.json'
      }
    };

    // CONFIG TABLE 2
    this.dtOptions[1] = {
      pagingType: 'simple',
      pageLength: 5,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/fr-FR.json'
      }
    };

    // CRÉER LES TRIGGERS
    this.dtTriggers[0] = new Subject();
    this.dtTriggers[1] = new Subject();

    this.loadeDemandeSouscriptions();
  }

  // Chargement de demandes de souscriptions
  private loadeDemandeSouscriptions(): void {
    this.isLoadingDemandes = true;

    this.demandeService.allDemandesSouscriptions().subscribe({
      next: (res) => {
        if (res?.status === 200) {
          this.demandes = res?.data.filter((d: any) => d.statutDemande === "En traitement");
          this.traitedDemandes = res?.data.filter((d: any) => d.statutDemande === "Valide");
          this.rejectedDemandes = res?.data.filter((d: any) => d.statutDemande === "Rejete");

          // Initialiser toutes les tables après chargement
          this.dtTriggers.forEach(t => t.next(null));
        } else {
          if (res?.error?.message === "Unauthenticated.") {
            this.toastr.error("Votre session a expirée", '', {positionClass: 'toast-custom-center'});
            this.router.navigate(['/login']);
          }
        }

        this.isLoadingDemandes = false;
        console.log("demande attentes:", this.demandes);
        console.log("demandes traited:", this.traitedDemandes);
      },

      error: (err) => {
        this.toastr.error("Une erreur interne est survenue.", '', {positionClass: 'toast-custom-center'});
        console.log("err demandes:", err);
        this.isLoadingDemandes = false;
      }
    })
  }

  ngOnDestroy(): void {
    // Détruire proprement
    this.dtTriggers.forEach(t => t.unsubscribe());
  }
}
