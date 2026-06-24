import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ModalsService } from '../../../services/modals/modals.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent-liste-entreprise',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './agent-liste-entreprise.component.html',
  styleUrl: './agent-liste-entreprise.component.css',
})
export class AgentListeEntrepriseComponent implements OnInit {
  idOrg: number | null = null;

  entreprises: any[] = [];
  filteredEntreprises: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalsService: ModalsService,
  ) {}

  ngOnInit() {
    // écoute query params
    this.route.queryParams.subscribe((params) => {
      this.idOrg = params['idOrg'] ? +params['idOrg'] : null;

      this.loadEntreprises();
    });
  }

  // 👉 données statiques (5 entreprises)
  loadEntreprises() {
    this.entreprises = [
      {
        id: 1,
        code: 'ENT000001',
        nom: 'Banque Centrale',
        telephone: '620000001',
        email: 'contact@bci.com',
        type: 'Banque',
        status: 'Actif',
        organisation: 'Finance Guinée',
        orgId: 1,
      },
      {
        id: 2,
        code: 'ENT000002',
        nom: 'Guinée Telecom',
        telephone: '620000002',
        email: 'contact@gt.com',
        type: 'Télécom',
        status: 'Actif',
        organisation: 'Tech Guinée',
        orgId: 2,
      },
      {
        id: 3,
        code: 'ENT000003',
        nom: 'Air Guinée',
        telephone: '620000003',
        email: 'contact@airgn.com',
        type: 'Transport',
        status: 'Inactif',
        organisation: 'Transport Guinée',
        orgId: 3,
      },
      {
        id: 4,
        code: 'ENT000004',
        nom: 'Hydro Energie',
        telephone: '620000004',
        email: 'contact@hydro.com',
        type: 'Énergie',
        status: 'Actif',
        organisation: 'Energie Guinée',
        orgId: 1,
      },
      {
        id: 5,
        code: 'ENT000005',
        nom: 'Société Minier',
        telephone: '620000005',
        email: 'contact@mine.com',
        type: 'Mine',
        status: 'Actif',
        organisation: 'Mine Guinée',
        orgId: 2,
      },
    ];

    this.applyFilter();
  }

  // 👉 filtre selon organisation
  applyFilter() {
    if (this.idOrg) {
      this.filteredEntreprises = this.entreprises.filter(
        (e) => e.orgId === this.idOrg,
      );
    } else {
      this.filteredEntreprises = this.entreprises;
    }
  }

  goToCreateCompany() {
    this.router.navigate(['/entreprise/new']);
  }

  goToFiche(id: number) {
    this.router.navigate(['/agent-entreprise', id]);
  }

  openModal(modalId: string) {
    if (!this.modalsService.isModalOpen(modalId)) {
      this.modalsService.openModal(modalId);
    }
  }

  closeModal(modalId: string) {
    if (this.modalsService.isModalOpen(modalId)) {
      this.modalsService.closeModal(modalId);
    }
  }
}
