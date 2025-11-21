import {Component, inject, OnInit} from '@angular/core';
import {UserLogService} from '../../../services/logs/user-log/user-log.service';
import {createWebpackLoggingCallback} from '@angular-devkit/build-angular/src/tools/webpack/utils/stats';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {PaginationsService} from '../../../services/paginations/paginations.service';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {debounce, debounceTime, distinctUntilChanged} from 'rxjs';
import {SearchParams} from '../../../interfaces/search-params.interface';
import {RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {exportToCSV, exportToPDF} from '../../../utils/export.utils';
import {DataTableDirective} from '../../../directives/data-table/data-table.directive';


@Component({
  selector: 'app-log-user',
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    DatePipe,
    RouterLink,
    DataTableDirective
  ],
  templateUrl: './log-user.component.html',
  styleUrl: './log-user.component.css'
})
export class LogUserComponent implements OnInit {
  // Variables
  logActiviteUsers: any[] = [];
  paginatedLogActiviteUser: any[] = [];
  isLoading: boolean = false;
  isLoadingUserLogs: boolean = false;

  nomUsers: any[] = [];
  isLoadingNomUser: boolean = false;

  searchForm: FormGroup;
  searchResults: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userLogSerive: UserLogService,
    public paginationService: PaginationsService,
    private toastr: ToastrService
  ) {
    this.searchForm = this.createForm();
  }


  // A l'initialisation du composant
  ngOnInit() {
    // this.setupRealTimeSearch();
    this.loadLogActiviteUsers();
    this.loadNomUsers()
  }


  /**
   * Creer un formulaire
   */
  createForm(): FormGroup {
    return this.fb.group({
      dateDebut: [''],
      dateFin: [''],
      application: [''],
      username: [''],
    })
  }

  /**
   * Recherche en temps réel avec debounce pour éviter trop d'appels API
   */
  setupRealTimeSearch() {
    this.searchForm.valueChanges.pipe(
      debounceTime(500), // Attendre 500ms après le dernier changement
      distinctUntilChanged() // Ne déclencher que si la valeur a changé
    ).subscribe(() => {
      this.performSearch()
    })
  }


  /**
   * Fonction private pour charger la liste des logs d'activites utilisateurs
   * @private
   */
  private loadLogActiviteUsers(): void {
    this.isLoadingUserLogs = true;

    this.userLogSerive.getAllUserLogs().subscribe({
      next: (res) => {
        this.isLoadingUserLogs = false;
        this.logActiviteUsers = res.data;
        console.log("LAU res : ", res);


      },

      error: (err) => {
        this.isLoadingUserLogs = false;
        this.logActiviteUsers = [];
        console.log("LAU err : ", err);
      }
    })
  }

  /**
   * Fonction private pour charger le nom des utilisateurs
   * @private
   */
  private loadNomUsers(): void {
    this.isLoadingNomUser = true;

    this.userLogSerive.getNomUsers().subscribe({
      next: (res) => {
        this.isLoadingNomUser = false;
        this.nomUsers = res.data;
        console.log("LAU res : ", res);
      },

      error: (err) => {
        this.isLoadingNomUser = false;
        this.nomUsers = [];
        console.log("LAU err : ", err);
      }
    })
  }


  // ====================== GESTION DE LA RECHERCHE OU FILTRAGE ======================
  /**
   * Performer la rechercher
   */
  performSearch() {
    this.isLoading = true;

    // Construuire les parametres de recherche
    const searchParams: SearchParams = {
      dateDebut: this.searchForm.get('dateDebut')?.value,
      dateFin: this.searchForm.get('dateFin')?.value,
      application: this.searchForm.get('application')?.value,
      username: this.searchForm.get('username')?.value
    }

    console.log(searchParams);

    this.userLogSerive.getFilteredLogsActiviteUsers(searchParams).subscribe({
      next: (res) => {
        this.isLoading = false;

        this.searchResults = res.data;
        this.logActiviteUsers = this.searchResults;
        console.log("LAUF res : ", res);


      },

      error: (err) => {
        this.isLoadingNomUser = false;
        console.log("LAUF err : ", err);
      }
    })
  }

  /**
   * Au clic sur le boutton de recherche
   */
  onSearchClick() {
    // Forcer la recherche au clic du bouton
    this.performSearch();
  }

  /**
   * Reinitialiser le formulaire de filtrage
   */
  resetForm() {
    this.searchForm.reset();
    // La recherche se déclenchera automatiquement grâce au valueChanges
  }

  // ====================== TYPES D'EXPORTATIONS ======================

  /**
   * Exporter en PDF
   * @param event
   */
  exportToPDFHandler(event: Event) {
    event.preventDefault()

    // Implementation de la logique d'export
    exportToPDF(this.paginatedLogActiviteUser, "LogsActivitesUtilisateurs.pdf", "Liste des Logs d'activitées Utilisateurs")
  }


  /**
   * Exporter en CSV
   * @param event
   */
  exportToCSVHandler(event: Event) {
    event.preventDefault()

    // Implementation de la logique d'export
    exportToCSV(this.paginatedLogActiviteUser, 'LogsActivitesUtilisateurs.csv')
  }
}
