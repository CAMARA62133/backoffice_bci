/**
 * Parametres de recherche des logs d'activites utilisateurs pour le filtrage
 */
export interface SearchParams {
  dateDebut?: string;
  dateFin?: string;
  application?: string;
  username?: string;
}

/**
 * Parametres de recherche des logs d'activites organisations pour le filtrage
 */
export interface SearchOrgParams {
  dateDebut?: string;
  dateFin?: string;
  application?: string;
  organisation?: string;
  username?:string;
}
