import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import {DataTablesModule} from 'angular-datatables';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private rendered: Renderer2) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const excluseArray = [
          '/login',
          '/forgot-password',
          '/lien-expire',
          '/valider-otp-login',
          '/validate-email',
          '/valider-otp-email',
          '/reinitialiser-mot-de-passe',
          '/reset',
          '/nouveau-mot-de-passe',
          '/org-nouveau-mot-de-passe',
          '/not-found',
          '/valider-otp',
          '/unauthorized',
        ];
        const currentUrl = this.router.url;
        if (excluseArray.includes(currentUrl)) {
          this.rendered.removeAttribute(document.body, 'data-sidebar-size');
        } else {
          this.rendered.setAttribute(document.body, 'data-sidebar-size', 'sm');
        }
      });
  }
}
