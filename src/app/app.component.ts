import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InactivityService } from './services/inactivity/inactivity.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private inactivityService: InactivityService) {}

  ngOnInit(): void {
    this.inactivityService.startWatching(); // 🚀 lance la détection d'inactivité
  }

  title = 'bci-online-backoffice';
}
