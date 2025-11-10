import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrganisationsService } from '../../../../services/organisations/organisations.service';

@Component({
  selector: 'app-page404',
  imports: [],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.css',
})
export class Page404Component implements OnInit {
  businnessEmailDomain: string | null = '';
  isLoading: boolean = false;

  constructor(
    private orgService: OrganisationsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.businnessEmailDomain = localStorage.getItem('validateEmailUrlEmail');
  }

  onResentLink() {
    this.isLoading = true;

    if (!this.businnessEmailDomain) {
      this.toastr.error('Email requis', '', {
        positionClass: 'toast-custom-center',
      });
      return;
    }

    this.orgService
      .renvoieLienVerification(this.businnessEmailDomain)
      .subscribe({
        next: (res) => {
          if (res?.status && res?.status === 200) {
            this.toastr.success(res?.message, '', {
              positionClass: 'toast-custom-center',
            });
          } else {
            this.toastr.error(res?.message, '', {
              positionClass: 'toast-custom-center',
            });
          }
          console.log('res api', res);
          this.isLoading = false;
        },

        error: (err) => {
          this.toastr.error(err?.message, '', {
            positionClass: 'toast-custom-center',
          });
          console.log('erreur : ', err);
          this.isLoading = false;
        },
      });
  }
}
