import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ModalsService } from '../../../services/modals/modals.service';

@Component({
  selector: 'app-agent-liste-entreprise',
  imports: [RouterLink],
  templateUrl: './agent-liste-entreprise.component.html',
  styleUrl: './agent-liste-entreprise.component.css',
})
export class AgentListeEntrepriseComponent {
  constructor(
    private router: Router,
    private modalsService: ModalsService,
  ) {}

  openModal(modalId: string) {
    if (!this.modalsService.isModalOpen(modalId)) {
      this.modalsService.openModal(modalId);
    }
  }

  closeModal(modalId: string) {
    const isModalOpen = this.modalsService.isModalOpen(modalId);
    if (isModalOpen) {
      this.modalsService.closeModal(modalId);
      // this.bloqueForm.reset();
    }
  }

  goToCreateCompany() {
    this.router.navigate(['/entreprise/new']);
  }
}
