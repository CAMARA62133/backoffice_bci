import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net-bs5';

import { MobileOperator } from '../models/mobile-operator.model';
import { MobileOperatorService } from '../../../../services/agent-conformite/mobile-operator/mobile-operator.service';
import { MobileOperatorForm } from '../mobile-operator-form/mobile-operator-form.component';
import { MobileOperatorDetailsComponent } from '../mobile-operator-detail/mobile-operator-detail.component';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-mobile-operator-list',
  standalone: true,
  imports: [
    CommonModule,
    MobileOperatorForm,
    MobileOperatorDetailsComponent,
    DataTablesModule,
  ],
  templateUrl: './mobile-operator.component.html',
  styleUrl: './mobile-operator.component.css',
})
export class MobileOperatorComponent implements OnInit, OnDestroy {
  private operatorService = inject(MobileOperatorService);
  public notification = inject(NotificationService);
  // --- Configuration DataTables ---
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  operators: MobileOperator[] = [];
  isLoading = false;

  isModalOpen = false;
  isDetailsModalOpen = false;
  modalMode: 'create' | 'edit' = 'create';
  selectedOperator: MobileOperator | null = null;

  ngOnInit(): void {
    this.initDataTableConfig();
    this.loadOperators();
  }

  ngOnDestroy(): void {
    this.dttrigger.unsubscribe();
  }

  initDataTableConfig(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      // 1. On définit 5 en premier pour correspondre au menu
      pageLength: 5,
      lengthMenu: [
        [5, 10, 25, 50, 100, -1],
        [5, 10, 25, 50, 100, 'Tout'],
      ],
      // 2. scrollY accepte soit un nombre, soit une chaîne avec 'px'
      scrollY: '350px',
      // 3. Permet de réduire la zone de scroll si le nombre d'éléments est faible
      scrollCollapse: true,
      processing: true,
      destroy: true,
      // 4. Important pour que le scroll horizontal fonctionne avec scrollY
      scrollX: true,
      language: {
        search: 'Rechercher :',
        lengthMenu: 'Afficher _MENU_ éléments',
        info: 'Affichage de _START_ à _END_ sur _TOTAL_ éléments',
        paginate: {
          first: 'Premier',
          previous: 'Précédent',
          next: 'Suivant',
          last: 'Dernier',
        },
        zeroRecords: 'Aucun enregistrement trouvé',
      },
    };
  }

  loadOperators(): void {
    this.isLoading = true;
    this.operatorService.getAll().subscribe({
      next: (response) => {
        const rawData = response.data || [];
        this.operators = rawData.map((item: any) => ({
          ...item,
          id: item.OperatorID,
          vcName: item.OperatorName,
          vcContact: item.Contact,
          vcPhoneNumber: item.PhoneNumber,
          vcEmail: item.Email,
          vcCity: item.City,
          vcCountry: item.Country,
          vcAddress: item.Address,
          vcLogoUrl: item.LogoPath,
          vcLogoPath: item.LogoPath,
          vcAccountName: item.AccountName,
          vcAccountNumber: item.AccountNumber,
          nFees: item.FeeAmount,
          // Mappage robuste des booléens
          IsPercentage: item.IsPercentage ? '%' : 'GNF',
          btFeesUsePercent: !!item.IsPercentage,
          btFeesIncluded: !!item.IsIncluded,
          IsActive: !!item.IsActive,
          btEnabled: !!item.IsActive,
        }));

        this.isLoading = false;
        this.rerenderTable(); // Déclenche DataTables
      },
      error: (err) => {
        this.notification.error('Erreur chargement');
        console.error('Erreur chargement:', err);
        this.isLoading = false;
      },
    });
  }

  rerenderTable(): void {
    // On vérifie si l'instance existe déjà
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: any) => {
        // On détruit l'ancien tableau pour libérer le DOM
        dtInstance.destroy();
        // On déclenche à nouveau le trigger pour reconstruire la table avec les nouvelles données
        this.dttrigger.next(null);
      });
    } else {
      // Si c'est le premier chargement
      this.dttrigger.next(null);
    }
  }

  handleFormSubmit(formData: any): void {
    this.isLoading = true;
    const request =
      this.modalMode === 'create'
        ? this.operatorService.create(formData)
        : this.operatorService.update({
            ...formData,
            id: this.selectedOperator?.id,
          });

    request.subscribe({
      next: () => {
        this.loadOperators();
        this.closeModal();
      },
      error: () => (this.isLoading = false),
    });
  }

  toggleStatus(operator: MobileOperator): void {
    const targetId = operator.id || (operator as any).OperatorID;
    const newStatus = !operator.IsActive;

    this.operatorService.toggle(targetId, newStatus).subscribe({
      next: () => {
        operator.IsActive = newStatus;
        operator.btEnabled = newStatus;
        // On ne reload pas tout pour garder la position dans la table,
        // mais on peut appeler loadOperators() si le backend change bcp de choses
      },
    });
  }

  // --- Gestion des Modales ---
  onViewDetails(operator: MobileOperator): void {
    this.selectedOperator = { ...operator };
    this.isDetailsModalOpen = true;
  }

  onAddOperator(): void {
    this.modalMode = 'create';
    this.selectedOperator = null;
    this.isModalOpen = true;
  }

  onEdit(operator: MobileOperator): void {
    this.modalMode = 'edit';
    this.selectedOperator = { ...operator };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
  }

  onEditFromDetails(operator: MobileOperator): void {
    this.isDetailsModalOpen = false;
    this.onEdit(operator);
  }
}