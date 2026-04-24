import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DemandeTransactionInternationale, toutesLesDemandes } from '../../pages/agent-trade/data/demandes.data';

@Injectable({
  providedIn: 'root',
})
export class DemandeTransactionClientService {
  private demandes: DemandeTransactionInternationale[] = [...toutesLesDemandes];

  private transactionTraiteeSource = new Subject<number>();
  transactionTraitee$ = this.transactionTraiteeSource.asObservable();

  getDemandes() {
    return this.demandes;
  }

  supprimerDemande(id: number) {
    this.demandes = this.demandes.filter((d) => d.id !== id);
    this.transactionTraiteeSource.next(id);
  }
}
