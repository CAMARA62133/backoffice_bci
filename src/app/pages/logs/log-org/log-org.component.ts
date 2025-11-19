import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {OrgLogService} from '../../../services/logs/org-log/org-log.service';
import {PaginationsService} from '../../../services/paginations/paginations.service';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {SearchOrgParams} from '../../../interfaces/search-params.interface';
import {createWebpackLoggingCallback} from '@angular-devkit/build-angular/src/tools/webpack/utils/stats';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {exportOrgLogToPDF, exportToCSV, exportToPDF} from '../../../utils/export.utils';

@Component({
  selector: 'app-log-org',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    DatePipe,
    RouterLink
  ],
  templateUrl: './log-org.component.html',
  styleUrl: './log-org.component.css'
})
export class LogOrgComponent implements OnInit {
//   Variables
  logActivitesOrg:any[] = [];
  paginatedLogActivitesOrg:any[] = [];
  isLoading:boolean = false;
  isLoadingOrgLogs:boolean = false;

  nomOrgs:any[] = [];
  isLoadingNomOrgs:boolean = false;

  searchForm: FormGroup;
  searchResults:any = [];

  constructor(
    private fb: FormBuilder,
    private orgLogServie: OrgLogService,
    public paginationService: PaginationsService
  ) {
    this.searchForm = this.createForm();
  }

  // A l'initialisation du composant
  ngOnInit() {
    // this.setupRealTimeSearch();
    this.loadLogActiviteOrgs();
    this.loadNomOrgs()
  }

  /**
   * Creer & Reinitialisr le fomrulaire de rechercher
   */
  createForm(){
    return this.fb.group({
      dateDebut: [''],
      dateFin: [''],
      application: [''],
      organisation: [''],
    })
  }

  /**
   * Recherche en temps reels avec debounce pour eviter trop d'appel API
   */
  setupRealTimeSearch(){
    this.searchForm.valueChanges.pipe(
      debounceTime(500),  // Attendre 500ms apres le dernier changement
      distinctUntilChanged(), // Ne declencher que si la valeur est changer
    ).subscribe(() => {
      this.performSearch();
    })
  }



  /**
   * Fonction private pour charger la liste des logs d'activites utilisateurs
   * @private
   */
  private loadLogActiviteOrgs(): void {
    this.isLoadingOrgLogs = true;

    this.orgLogServie.getLogActiviteOrganisation().subscribe({
      next: (res) => {
        this.isLoadingOrgLogs = false;
        this.logActivitesOrg = res.data;

        this.paginationService.setData(this.logActivitesOrg, 300);
        this.paginatedLogActivitesOrg = this.paginationService.getPaginatedData();

        console.log("LAU res : ", res);
      },

      error: (err) => {
        this.isLoadingOrgLogs = false;
        this.logActivitesOrg = [];
        console.log("LAU err : ", err);
      }
    })
  }

  /**
   * Fonction private pour charger le nom des utilisateurs
   * @private
   */
  private loadNomOrgs(): void {
    this.isLoadingNomOrgs = true;

    this.orgLogServie.getNomOrganisation().subscribe({
      next: (res) => {
        this.isLoadingNomOrgs = false;
        this.nomOrgs = res.data;
        console.log("LAU res : ", res);
      },

      error: (err) => {
        this.isLoadingNomOrgs = false;
        this.nomOrgs = [];
        console.log("LAU err : ", err);
      }
    })
  }


  // ====================== GESTION DE LA RECHERCHE OU FILTRAGE ======================
  /**
   * Performer la rechercher
   */
  performSearch(){
    this.isLoading = true;

    // Construire les parametres de recherche
    const searchParams:SearchOrgParams = {
      dateDebut: this.searchForm.get('dateDebut')?.value,
      dateFin: this.searchForm.get('dateFin')?.value,
      application: this.searchForm.get('application')?.value,
      organisation: this.searchForm.get('organisation')?.value,
    }

    console.log(searchParams);

    this.orgLogServie.getFilteredLogsActiviteOrganisation(searchParams).subscribe({

      next: (res) =>{
        this.isLoading = false;

        this.searchResults = res.data;
        this.logActivitesOrg = this.searchResults;

        this.paginationService.setData(this.logActivitesOrg, 500)
        this.paginatedLogActivitesOrg = this.paginationService.getPaginatedData();

        console.log("LAGF res:", res)
      },

      error: (err) => {
        this.isLoading = false;
        console.log("LAGF err:", err)
      }
    })
  }

  onSearchClick(){
    this.performSearch();
  }

  resetForm(){
    this.searchForm.reset();
  }

  // ====================== GESTION DE LA PAGINATION ======================
  // Mise a jour de la pagination
  updatePaginatedData(): void {
    this.paginatedLogActivitesOrg = this.paginationService.getPaginatedData();
  }

  // Page suivante
  nextPage(): void {
    this.paginationService.goToNextPage();
    this.updatePaginatedData();
  }

  // Page precedante
  previousPage(): void {
    this.paginationService.goToPreviousPage();
    this.updatePaginatedData();
  }

  // Premiere page
  firstPage(): void {
    this.paginationService.goToFirstPage();
    this.updatePaginatedData();
  }

  // Derniere page
  lastPage(): void {
    this.paginationService.goToLastPage();
    this.updatePaginatedData();
  }

  // Aller a la page
  goToPage(page: number): void {
    this.paginationService.currentPage = page;
    this.updatePaginatedData();
  }

// ====================== TYPES D'EXPORTATIONS ======================

  /**
   * Exporter en PDF
   * @param event
   */
  exportToPDFHandler(event: Event) {
    event.preventDefault()

    // Implementation de la logique d'export
    exportOrgLogToPDF(this.paginatedLogActivitesOrg, "LogsActivitesOrganisations.pdf")
  }


  /**
   * Exporter en CSV
   * @param event
   */
  exportToCSVHandler(event: Event) {
    event.preventDefault()

    // Implementation de la logique d'export
    exportToCSV(this.paginatedLogActivitesOrg, 'LogsActivitesOrganisations.csv')
  }
}
