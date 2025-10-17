import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-alertes',
  imports: [CommonModule],
  templateUrl: './alertes.component.html',
  styleUrl: './alertes.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertesComponent implements AfterViewInit {
  // console.log('🧩 Données reçues :', alerts);

  // alertList: Array<[]> = [];
  // modules: any[] = [];
  // niveauxUrgences: any[] = [];
  // groupeConcernes: any[] = [];

  @ViewChild('alertComp', { static: true }) alertComp!: ElementRef;

  alerts = [
    {
      id: '1',
      statusAlert: '1',
      messageAlerte: 'Serveur en maintenance',
      typeAlert: 'URGENT',
      vcDescription: 'Maintenance planifiée',
    },
  ];

  modules = [{ id: '1', name: 'Serveur' }];
  niveaux = [{ id: '1', label: 'Élevé' }];
  groupes = ['IT'];

  ngAfterViewInit(): void {
    setTimeout(() => {
      const el = this.alertComp.nativeElement;
      el.alerts = this.alerts;
      el.modules = this.modules;
      el.niveaux = this.niveaux;
      el.groupes = this.groupes;
      el.loading = false;
    }, 100);
  }

  refreshAlerts() {
    console.log('🔄 Rafraîchir les alertes');
    // ➜ Appel API Angular pour récupérer les alertes
  }

  createAlert(payload: any) {
    console.log('🆕 Nouvelle alerte :', payload);
    // ➜ Appel API pour créer une alerte
  }

  updateAlert(payload: any) {
    console.log('✏️ Modification alerte :', payload);
    // ➜ Appel API pour mise à jour
  }

  toggleAlert(id: string, next: string) {
    console.log(`🔁 Toggle de l’alerte ${id} → ${next}`);
    // ➜ Appel API pour activer/désactiver
  }

  // // this.alerteService.getListeAlertesConfig().subscribe({
  //   next: (res) => {
  //     console.log('response api alertes : ', res);
  //     this.alertList = res.data;
  //     console.log('ndf', this.alertList);
  //   },

  //   error: (err) => {
  //     console.log('res erreur api alertes : ', err);
  //   },
  // });

  // this.alerteService.getListeModules().subscribe({
  //   next: (res) => {
  //     console.log('response api alertes modules : ', res);
  //   },

  //   error: (err) => {
  //     console.log('res erreur api alertes modules : ', err);
  //   },
  // });

  // this.alerteService.getListeGroupeConcerner().subscribe({
  //   next: (res) => {
  //     console.log('response api alertes groupe concernes : ', res);
  //   },

  //   error: (err) => {
  //     console.log('res erreur api alertes groupe concernes : ', err);
  //   },
  // });

  // this.alerteService.getListeNiveauUrgence().subscribe({
  //   next: (res) => {
  //     console.log('response api alertes niveaux urgences : ', res);
  //   },

  //   error: (err) => {
  //     console.log('res erreur api alertes niveaux urgences : ', err);
  //   },
  // });
}
