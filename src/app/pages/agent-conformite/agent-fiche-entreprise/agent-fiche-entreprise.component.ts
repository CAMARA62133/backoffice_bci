import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/authService/auth.service';
import { UserModel } from '../../../core/models/user.model';
import { ROLES } from '../../../core/constants/roles.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent-fiche-entreprise',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agent-fiche-entreprise.component.html',
  styleUrl: './agent-fiche-entreprise.component.css',
})
export class AgentFicheEntrepriseComponent implements OnInit {
  currentUser!: UserModel;
  readonly ROLES = ROLES;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.currentUser = this.authService.getUserInfo();
  }

  canShowTabs(): boolean {
    return (
      this.currentUser.iRoleID !== ROLES.DG &&
      this.currentUser.iRoleID !== ROLES.DGA
    );
  }
}
