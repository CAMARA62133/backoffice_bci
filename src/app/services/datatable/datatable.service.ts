import {Injectable} from '@angular/core';

declare var initMyDatatable: any;

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  constructor() {
  }

  init() {
    setTimeout(() => {
      initMyDatatable();
    }, 0);
  }
}
