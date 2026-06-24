import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  TransactionMultiple,
  TRANSACTIONS_MULTIPLES,
} from '../../pages/transaction-multiples/data/transaction-multile.data';

@Injectable({
  providedIn: 'root',
})
export class TransactionMultipleService {
  private transactions: TransactionMultiple[] = [...TRANSACTIONS_MULTIPLES];

  private transactionTraiteeSource = new Subject<number>();
  transactionTraitee$ = this.transactionTraiteeSource.asObservable();

  gettransactionMultiple() {
    return this.transactions;
  }

  supprimertransactionMultiple(id: number) {
    this.transactions = this.transactions.filter((d) => d.id !== id);
    this.transactionTraiteeSource.next(id);
  }
}
