import {AfterViewInit, Directive} from '@angular/core';

declare var initMyDatatable: any;

@Directive({
  selector: '[appDataTable]'
})
export class DataTableDirective implements AfterViewInit {
  ngAfterViewInit() {
    setTimeout(() => {
      initMyDatatable();
    }, 0);
  }
}
