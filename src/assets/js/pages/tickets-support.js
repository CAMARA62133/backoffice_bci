/**
 * ============================================================================
 * GESTION TICKETS & SUPPORT - QUALITÉ DE SERVICE
 * Module JavaScript pour la gestion complète des tickets et du support client BCI
 * ============================================================================
 */

class SupportManager {
  constructor() {
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.filteredTickets = [];
    this.selectedTickets = [];
    this.charts = {};
    this.currentTicket = null;
    this.autoRefreshInterval = null;
    this.init();
  }

  /**
   * Initialisation du module
   */
  init() {
    this.initializeData();
    this.setupEventListeners();
    this.loadData();
    this.setupCharts();
    this.updateDashboard();
    this.startAutoRefresh();
    this.loadEntreprisesList();
  }

  /**
   * Initialisation des données par défaut
   */
  initializeData() {
    if (!localStorage.getItem('supportData')) {
      const defaultData = {
        tickets: [
          {
            id: "TKT_001",
            numero: "2025-0001",
            dateCreation: "2025-07-21T09:00:00Z",
            dateModification: "2025-07-21T14:30:00Z",
            dateFermeture: null,
            statut: "EN_COURS",
            priorite: "HAUTE",
            categorie: "INCIDENT_TECHNIQUE",
            sousCategorie: "CONNEXION",
            sujet: "Problème de connexion à la plateforme",
            description: "L'utilisateur ne peut pas se connecter depuis ce matin, erreur 'Identifiants invalides'",

            // Entreprise concernée
            entrepriseId: "ENT_001",
            entrepriseName: "Tech Solutions SARL",

            // Demandeur
            demandeur: {
              nom: "Jean Martin",
              email: "j.martin@techsolutions.com",
              telephone: "+224 123 456 789",
              fonction: "Directeur Financier"
            },

            // Attribution
            assigneA: "support_002",
            assigneNom: "Marie Dupont",
            niveauSupport: 2,
            serviceResponsable: "Support Technique",

            // SLA
            sla: {
              delaiReponse: 4,
              delaiResolution: 24,
              dateEcheanceReponse: "2025-07-21T13:00:00Z",
              dateEcheanceResolution: "2025-07-22T09:00:00Z",
              respecteReponse: false,
              respecteResolution: true,
              tempsEcouleReponse: 5.5,
              tempsEcouleResolution: 5.5
            },

            // Communication
            messages: [
              {
                id: "MSG_001",
                timestamp: "2025-07-21T09:15:00Z",
                auteur: "Jean Martin",
                type: "CLIENT",
                contenu: "Impossible de me connecter, erreur 'Identifiants invalides'",
                pieceJointes: ["screenshot_erreur.png"],
                visibleClient: true
              },
              {
                id: "MSG_002",
                timestamp: "2025-07-21T10:30:00Z",
                auteur: "Marie Dupont",
                type: "SUPPORT",
                contenu: "Vérification des logs de connexion en cours",
                pieceJointes: [],
                visibleClient: false
              }
            ],

            // Historique
            historique: [
              {
                timestamp: "2025-07-21T09:00:00Z",
                action: "CREATION",
                auteur: "system",
                details: "Ticket créé via portal client"
              },
              {
                timestamp: "2025-07-21T10:00:00Z",
                action: "ASSIGNATION",
                auteur: "supervisor_001",
                details: "Assigné à Marie Dupont (Niveau 2)"
              }
            ],

            tags: ["urgent", "connexion", "authentification"],
            resolutionNote: null,
            satisfactionClient: null,
            estimationResolution: "2025-07-22T09:00:00Z"
          },
          {
            id: "TKT_002",
            numero: "2025-0002",
            dateCreation: "2025-07-21T10:30:00Z",
            dateModification: "2025-07-21T10:30:00Z",
            dateFermeture: null,
            statut: "NOUVEAU",
            priorite: "NORMALE",
            categorie: "DEMANDE_DOCUMENT",
            sousCategorie: "ATTESTATION",
            sujet: "Demande d'attestation de compte",
            description: "Besoin d'une attestation de compte pour appel d'offres",

            entrepriseId: "ENT_002",
            entrepriseName: "Commerce Plus Ltd",

            demandeur: {
              nom: "Sophie Bernard",
              email: "s.bernard@commerceplus.com",
              telephone: "+224 987 654 321",
              fonction: "Comptable"
            },

            assigneA: null,
            assigneNom: null,
            niveauSupport: 1,
            serviceResponsable: "Support Général",

            sla: {
              delaiReponse: 8,
              delaiResolution: 48,
              dateEcheanceReponse: "2025-07-21T18:30:00Z",
              dateEcheanceResolution: "2025-07-23T10:30:00Z",
              respecteReponse: true,
              respecteResolution: true,
              tempsEcouleReponse: 0,
              tempsEcouleResolution: 0
            },

            messages: [
              {
                id: "MSG_003",
                timestamp: "2025-07-21T10:30:00Z",
                auteur: "Sophie Bernard",
                type: "CLIENT",
                contenu: "Bonjour, j'ai besoin d'une attestation de compte pour participer à un appel d'offres. Merci",
                pieceJointes: [],
                visibleClient: true
              }
            ],

            historique: [
              {
                timestamp: "2025-07-21T10:30:00Z",
                action: "CREATION",
                auteur: "system",
                details: "Ticket créé via portal client"
              }
            ],

            tags: ["document", "attestation"],
            resolutionNote: null,
            satisfactionClient: null,
            estimationResolution: "2025-07-22T16:00:00Z"
          },
          {
            id: "TKT_003",
            numero: "2025-0003",
            dateCreation: "2025-07-20T14:00:00Z",
            dateModification: "2025-07-21T09:00:00Z",
            dateFermeture: "2025-07-21T09:00:00Z",
            statut: "RESOLU",
            priorite: "CRITIQUE",
            categorie: "INCIDENT_TECHNIQUE",
            sousCategorie: "TRANSACTION",
            sujet: "Virement international bloqué",
            description: "Virement de 50k€ vers la France bloqué sans raison apparente",

            entrepriseId: "ENT_003",
            entrepriseName: "Import Export SA",

            demandeur: {
              nom: "Ahmed Diallo",
              email: "a.diallo@importexport.com",
              telephone: "+224 555 123 456",
              fonction: "Directeur Général"
            },

            assigneA: "support_003",
            assigneNom: "Pierre Martin",
            niveauSupport: 2,
            serviceResponsable: "Support Technique",

            sla: {
              delaiReponse: 1,
              delaiResolution: 4,
              dateEcheanceReponse: "2025-07-20T15:00:00Z",
              dateEcheanceResolution: "2025-07-20T18:00:00Z",
              respecteReponse: true,
              respecteResolution: false,
              tempsEcouleReponse: 0.5,
              tempsEcouleResolution: 19
            },

            messages: [
              {
                id: "MSG_004",
                timestamp: "2025-07-20T14:00:00Z",
                auteur: "Ahmed Diallo",
                type: "CLIENT",
                contenu: "URGENT: Mon virement de 50k€ vers la France est bloqué depuis ce matin",
                pieceJointes: ["capture_transaction.png"],
                visibleClient: true
              },
              {
                id: "MSG_005",
                timestamp: "2025-07-20T14:30:00Z",
                auteur: "Pierre Martin",
                type: "SUPPORT",
                contenu: "Transaction mise en attente pour vérification AML. Investigation en cours.",
                pieceJointes: [],
                visibleClient: true
              }
            ],

            historique: [
              {
                timestamp: "2025-07-20T14:00:00Z",
                action: "CREATION",
                auteur: "system",
                details: "Ticket créé via portal client"
              },
              {
                timestamp: "2025-07-21T09:00:00Z",
                action: "RESOLUTION",
                auteur: "support_003",
                details: "Transaction débloquée après validation conformité"
              }
            ],

            tags: ["critique", "virement", "aml", "déblocage"],
            resolutionNote: "Transaction débloquée après validation du service conformité. Contrôle AML automatique trop strict.",
            satisfactionClient: 4,
            estimationResolution: null
          }
        ],

        statistiques: {
          global: {
            ticketsOuverts: 45,
            ticketsEnCours: 28,
            ticketsResolus24h: 67,
            ticketsNouveaux: 8,
            tempsReponseModyen: 2.5,
            tempsResolutionMoyen: 18.2,
            tauxRespectSLA: 94.5,
            satisfactionMoyenne: 4.2,
            ticketsRetard: 3,
            ticketsEscalades: 2
          },

          parCategorie: {
            "INCIDENT_TECHNIQUE": {nombre: 18, tempsResolution: 12.5, tauxSLA: 96.2},
            "DEMANDE_ACCES": {nombre: 12, tempsResolution: 6.8, tauxSLA: 98.5},
            "QUESTION_FONCTIONNELLE": {nombre: 9, tempsResolution: 4.2, tauxSLA: 100.0},
            "DEMANDE_DOCUMENT": {nombre: 6, tempsResolution: 24.1, tauxSLA: 87.3}
          },

          parAgent: [
            {
              agentId: "support_001",
              nom: "Alice Bernard",
              ticketsTraites: 23,
              satisfaction: 4.5,
              tempsReponse: 2.1,
              tauxSLA: 97.2
            },
            {
              agentId: "support_002",
              nom: "Marie Dupont",
              ticketsTraites: 19,
              satisfaction: 4.2,
              tempsReponse: 2.8,
              tauxSLA: 93.1
            },
            {
              agentId: "support_003",
              nom: "Pierre Martin",
              ticketsTraites: 15,
              satisfaction: 4.0,
              tempsReponse: 3.2,
              tauxSLA: 91.5
            }
          ]
        },

        configuration: {
          sla: {
            CRITIQUE: {reponse: 1, resolution: 4},
            HAUTE: {reponse: 4, resolution: 24},
            NORMALE: {reponse: 8, resolution: 48},
            BASSE: {reponse: 24, resolution: 96}
          },

          categories: [
            {
              id: "INCIDENT_TECHNIQUE",
              label: "Incident Technique",
              sousCategories: ["CONNEXION", "PERFORMANCE", "FONCTIONNALITE", "TRANSACTION"],
              niveauDefaut: 1,
              escaladeAuto: true
            },
            {
              id: "DEMANDE_ACCES",
              label: "Demande d'Accès",
              sousCategories: ["NOUVEAU_UTILISATEUR", "MODIFICATION_DROITS", "REINITIALISATION"],
              niveauDefaut: 1,
              escaladeAuto: false
            },
            {
              id: "QUESTION_FONCTIONNELLE",
              label: "Question Fonctionnelle",
              sousCategories: ["UTILISATION", "FORMATION", "PROCEDURE"],
              niveauDefaut: 1,
              escaladeAuto: false
            },
            {
              id: "DEMANDE_DOCUMENT",
              label: "Demande de Document",
              sousCategories: ["ATTESTATION", "RELEVE", "RAPPORT"],
              niveauDefaut: 1,
              escaladeAuto: false
            }
          ],

          notifications: {
            nouveauTicket: true,
            escalade: true,
            depassementSLA: true,
            resolution: true,
            satisfaction: true
          }
        },

        agents: [
          {id: "support_001", nom: "Alice Bernard", niveau: 1, statut: "DISPONIBLE"},
          {id: "support_002", nom: "Marie Dupont", niveau: 2, statut: "OCCUPEE"},
          {id: "support_003", nom: "Pierre Martin", niveau: 2, statut: "DISPONIBLE"},
          {id: "supervisor_001", nom: "Jean Superviseur", niveau: 3, statut: "DISPONIBLE"}
        ]
      };

      localStorage.setItem('supportData', JSON.stringify(defaultData));
    }
  }

  /**
   * Configuration des écouteurs d'événements
   */
  setupEventListeners() {
    // Filtres et recherche
    document.getElementById('searchTickets').addEventListener('input', () => this.filterTickets());
    document.getElementById('filterStatut').addEventListener('change', () => this.filterTickets());
    document.getElementById('filterPriorite').addEventListener('change', () => this.filterTickets());
    document.getElementById('filterCategorie').addEventListener('change', () => this.filterTickets());
    document.getElementById('filterAgent').addEventListener('change', () => this.filterTickets());
    document.getElementById('resetFilters').addEventListener('click', () => this.resetFilters());

    // Actions principales
    document.getElementById('nouveauTicket').addEventListener('click', () => this.showNewTicketModal());
    document.getElementById('ticketsRetardBtn').addEventListener('click', () => this.showTicketsEnRetard());
    document.getElementById('rapportSLA').addEventListener('click', () => this.generateSLAReport());

    // Sélection
    document.getElementById('selectAll').addEventListener('click', () => this.selectAllTickets());
    document.getElementById('selectAllCheckbox').addEventListener('change', () => this.toggleSelectAll());
    document.getElementById('refreshTickets').addEventListener('click', () => this.refreshData());

    // Modal nouveau ticket
    document.getElementById('creerTicketBtn').addEventListener('click', () => this.createNewTicket());
    document.getElementById('ticketCategorie').addEventListener('change', () => this.updateSousCategories());

    // Modal détails ticket
    document.getElementById('escaladeTicket').addEventListener('click', () => this.escaladeCurrentTicket());
    document.getElementById('assignTicket').addEventListener('click', () => this.assignCurrentTicket());
    document.getElementById('resolveTicket').addEventListener('click', () => this.resolveCurrentTicket());

    // Communication
    document.getElementById('envoyerMessage').addEventListener('click', () => this.sendMessage());

    // Onglets
    document.querySelectorAll('#supportTabs a[data-bs-toggle="tab"]').forEach(tab => {
      tab.addEventListener('shown.bs.tab', (event) => this.handleTabChange(event));
    });
  }

  /**
   * Chargement des données
   */
  loadData() {
    this.filterTickets();
    this.updateDashboard();
  }

  /**
   * Filtrage des tickets
   */
  filterTickets() {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const searchTerm = document.getElementById('searchTickets').value.toLowerCase();
    const statut = document.getElementById('filterStatut').value;
    const priorite = document.getElementById('filterPriorite').value;
    const categorie = document.getElementById('filterCategorie').value;
    const agent = document.getElementById('filterAgent').value;
    const currentUser = document.getElementById('user-role').textContent;

    let filteredTickets = supportData.tickets.filter(ticket => {
      const matchSearch = !searchTerm ||
        ticket.numero.toLowerCase().includes(searchTerm) ||
        ticket.sujet.toLowerCase().includes(searchTerm) ||
        ticket.entrepriseName.toLowerCase().includes(searchTerm) ||
        ticket.demandeur.nom.toLowerCase().includes(searchTerm);

      const matchStatut = !statut || ticket.statut === statut;
      const matchPriorite = !priorite || ticket.priorite === priorite;
      const matchCategorie = !categorie || ticket.categorie === categorie;

      let matchAgent = true;
      if (agent === 'MOI') {
        matchAgent = ticket.assigneNom === currentUser;
      } else if (agent === 'NON_ASSIGNE') {
        matchAgent = !ticket.assigneA;
      } else if (agent) {
        matchAgent = ticket.assigneA === agent;
      }

      return matchSearch && matchStatut && matchPriorite && matchCategorie && matchAgent;
    });

    // Trier par priorité puis par date
    filteredTickets.sort((a, b) => {
      const priorityOrder = {'CRITIQUE': 4, 'HAUTE': 3, 'NORMALE': 2, 'BASSE': 1};
      const priorityDiff = priorityOrder[b.priorite] - priorityOrder[a.priorite];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.dateCreation) - new Date(a.dateCreation);
    });

    this.filteredTickets = filteredTickets;
    this.displayTickets(filteredTickets);
    this.updateTicketsCount();
  }

  /**
   * Affichage des tickets
   */
  displayTickets(tickets) {
    const tbody = document.getElementById('ticketsTableBody');
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const pageTickets = tickets.slice(startIndex, endIndex);

    tbody.innerHTML = '';

    if (pageTickets.length === 0) {
      tbody.innerHTML = `
                <tr>
                    <td colspan="10" class="text-center py-4">
                        <div class="no-tickets">
                            <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                            <p class="text-muted">Aucun ticket ne correspond aux critères de filtrage.</p>
                        </div>
                    </td>
                </tr>
            `;
      return;
    }

    pageTickets.forEach(ticket => {
      const row = this.createTicketRow(ticket);
      tbody.appendChild(row);
    });

    this.updatePagination();
  }

  /**
   * Création d'une ligne de ticket
   */
  createTicketRow(ticket) {
    const row = document.createElement('tr');
    const priorityClass = this.getPriorityClass(ticket.priorite);
    const statusClass = this.getStatusClass(ticket.statut);
    const slaStatus = this.getSLAStatus(ticket);
    const formattedDate = new Date(ticket.dateCreation).toLocaleString('fr-FR');
    const timeAgo = this.getTimeAgo(ticket.dateCreation);

    row.className = `ticket-row priority-${priorityClass} ${!ticket.assigneA ? 'unassigned' : ''}`;
    row.innerHTML = `
            <td>
                <input type="checkbox" class="form-check-input ticket-checkbox" value="${ticket.id}">
            </td>
            <td>
                <div class="ticket-number">
                    <strong>#${ticket.numero}</strong>
                    <div class="ticket-priority">
                        <span class="badge bg-${priorityClass}">${ticket.priorite}</span>
                    </div>
                </div>
            </td>
            <td>
                <div class="entreprise-info">
                    <strong>${ticket.entrepriseName}</strong>
                    <br><small class="text-muted">${ticket.entrepriseId}</small>
                </div>
            </td>
            <td>
                <div class="ticket-subject">
                    <span class="subject-text" title="${ticket.description}">
                        ${ticket.sujet}
                    </span>
                    <br><small class="text-muted">${ticket.categorie.replace('_', ' ')}</small>
                </div>
            </td>
            <td>
                <span class="badge bg-${priorityClass}">${ticket.priorite}</span>
            </td>
            <td>
                <span class="badge bg-${statusClass}">${this.getStatusLabel(ticket.statut)}</span>
            </td>
            <td>
                <div class="agent-info">
                    ${ticket.assigneNom ?
      `<strong>${ticket.assigneNom}</strong><br><small>Niveau ${ticket.niveauSupport}</small>` :
      '<span class="text-muted">Non assigné</span>'
    }
                </div>
            </td>
            <td>
                <div class="sla-info">
                    <div class="sla-status ${slaStatus.class}">
                        <i class="fas fa-${slaStatus.icon}"></i>
                        <span>${slaStatus.label}</span>
                    </div>
                    <small class="sla-details">${slaStatus.details}</small>
                </div>
            </td>
            <td>
                <div class="date-info">
                    <strong>${timeAgo}</strong>
                    <br><small class="text-muted">${formattedDate}</small>
                </div>
            </td>
            <td>
                <div class="ticket-actions">
                    <button class="btn btn-sm btn-outline-primary" onclick="supportManager.showTicketDetails('${ticket.id}')" title="Voir détails">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-success" onclick="supportManager.openCommunication('${ticket.id}')" title="Communication">
                        <i class="fas fa-comments"></i>
                    </button>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" title="Plus d'actions">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <ul class="dropdown-menu">
                            ${!ticket.assigneA ?
      `<li><a class="dropdown-item" href="#" onclick="supportManager.assignToMe('${ticket.id}')">
                                    <i class="fas fa-user-plus me-2"></i>M'assigner</a></li>` :
      ''
    }
                            ${ticket.statut === 'NOUVEAU' || ticket.statut === 'EN_COURS' ?
      `<li><a class="dropdown-item" href="#" onclick="supportManager.escaladeTicket('${ticket.id}')">
                                    <i class="fas fa-arrow-up me-2"></i>Escalader</a></li>` :
      ''
    }
                            ${ticket.statut !== 'RESOLU' && ticket.statut !== 'FERME' ?
      `<li><a class="dropdown-item text-success" href="#" onclick="supportManager.quickResolve('${ticket.id}')">
                                    <i class="fas fa-check me-2"></i>Résoudre</a></li>` :
      ''
    }
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="supportManager.duplicateTicket('${ticket.id}')">
                                <i class="fas fa-copy me-2"></i>Dupliquer</a></li>
                        </ul>
                    </div>
                </div>
            </td>
        `;

    return row;
  }

  /**
   * Mise à jour du dashboard
   */
  updateDashboard() {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const stats = supportData.statistiques.global;

    // Mise à jour des métriques principales
    document.getElementById('ticketsOuverts').textContent = stats.ticketsOuverts;
    document.getElementById('ticketsEnCours').textContent = stats.ticketsEnCours;
    document.getElementById('ticketsResolus24h').textContent = stats.ticketsResolus24h;
    document.getElementById('satisfactionMoyenne').textContent = stats.satisfactionMoyenne;

    // Mise à jour de la barre SLA
    document.getElementById('slaGlobal').textContent = `${stats.tauxRespectSLA}%`;
    document.getElementById('tempsReponse').textContent = `${stats.tempsReponseModyen}h`;
    document.getElementById('ticketsRetard').textContent = stats.ticketsRetard;

    // Mise à jour des badges
    document.getElementById('ticketsCritiques').textContent = this.countTicketsByPriority('CRITIQUE');
    document.getElementById('ticketsUrgents').textContent = this.countTicketsByPriority('HAUTE');
    document.getElementById('ticketsResolus').textContent = stats.ticketsResolus24h;

    // Mise à jour des compteurs d'onglets
    document.getElementById('ticketsCount').textContent = stats.ticketsOuverts;
    document.getElementById('mesTicketsCount').textContent = this.countMyTickets();
    document.getElementById('escaladesCount').textContent = stats.ticketsEscalades;
  }

  /**
   * Configuration des graphiques
   */
  setupCharts() {
    this.setupTicketsParStatutChart();
    this.setupSLAPerformanceChart();
    this.setupTicketsParCategorieChart();
    this.setupPerformanceAgentsChart();
    this.setupTendanceTicketsChart();
    this.setupSatisfactionTendanceChart();
  }

  /**
   * Graphique des tickets par statut
   */
  setupTicketsParStatutChart() {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const statusCounts = {};

    supportData.tickets.forEach(ticket => {
      statusCounts[ticket.statut] = (statusCounts[ticket.statut] || 0) + 1;
    });

    const options = {
      series: Object.values(statusCounts),
      chart: {
        type: 'donut',
        height: 350
      },
      labels: Object.keys(statusCounts).map(status => this.getStatusLabel(status)),
      colors: ['#28a745', '#ffc107', '#17a2b8', '#dc3545', '#6c757d'],
      title: {
        text: 'Répartition par Statut',
        style: {color: '#343473'}
      },
      legend: {
        position: 'bottom'
      }
    };

    this.charts.ticketsStatut = new ApexCharts(document.querySelector("#ticketsParStatutChart"), options);
    this.charts.ticketsStatut.render();
  }

  /**
   * Graphique de performance SLA
   */
  setupSLAPerformanceChart() {
    const options = {
      series: [94.5],
      chart: {
        type: 'radialBar',
        height: 350
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          dataLabels: {
            name: {
              fontSize: '16px',
              color: '#343473',
              offsetY: 120
            },
            value: {
              fontSize: '30px',
              color: '#343473',
              offsetY: 50,
              formatter: function (val) {
                return val + '%';
              }
            }
          }
        }
      },
      fill: {
        colors: ['#28a745']
      },
      labels: ['Performance SLA'],
      title: {
        text: 'Respect des SLA',
        style: {color: '#343473'}
      }
    };

    this.charts.slaPerformance = new ApexCharts(document.querySelector("#slaPerformanceChart"), options);
    this.charts.slaPerformance.render();
  }

  /**
   * Graphique des tickets par catégorie
   */
  setupTicketsParCategorieChart() {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const categories = Object.keys(supportData.statistiques.parCategorie);
    const values = categories.map(cat => supportData.statistiques.parCategorie[cat].nombre);

    const options = {
      series: [{
        data: values
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      colors: ['#343473'],
      xaxis: {
        categories: categories.map(cat => cat.replace('_', ' '))
      },
      title: {
        text: 'Tickets par Catégorie',
        style: {color: '#343473'}
      }
    };

    this.charts.ticketsCategorie = new ApexCharts(document.querySelector("#ticketsParCategorieChart"), options);
    this.charts.ticketsCategorie.render();
  }

  /**
   * Graphique de performance des agents
   */
  setupPerformanceAgentsChart() {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const agents = supportData.statistiques.parAgent;

    const options = {
      series: [{
        name: 'Tickets Traités',
        data: agents.map(agent => agent.ticketsTraites)
      }, {
        name: 'Satisfaction',
        data: agents.map(agent => agent.satisfaction)
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      colors: ['#343473', '#28a745'],
      xaxis: {
        categories: agents.map(agent => agent.nom)
      },
      title: {
        text: 'Performance des Agents',
        style: {color: '#343473'}
      },
      yaxis: [{
        title: {
          text: 'Tickets Traités'
        }
      }, {
        opposite: true,
        title: {
          text: 'Satisfaction (sur 5)'
        },
        max: 5
      }]
    };

    this.charts.performanceAgents = new ApexCharts(document.querySelector("#performanceAgentsChart"), options);
    this.charts.performanceAgents.render();
  }

  /**
   * Graphique de tendance des tickets
   */
  setupTendanceTicketsChart() {
    const last7Days = [];
    const ticketCounts = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(date.toLocaleDateString('fr-FR', {weekday: 'short'}));
      ticketCounts.push(Math.floor(Math.random() * 20) + 5);
    }

    const options = {
      series: [{
        name: 'Nouveaux Tickets',
        data: ticketCounts
      }],
      chart: {
        type: 'area',
        height: 350
      },
      colors: ['#343473'],
      xaxis: {
        categories: last7Days
      },
      title: {
        text: 'Tendance des Tickets (7 derniers jours)',
        style: {color: '#343473'}
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9
        }
      }
    };

    this.charts.tendanceTickets = new ApexCharts(document.querySelector("#tendanceTicketsChart"), options);
    this.charts.tendanceTickets.render();
  }

  /**
   * Graphique de tendance satisfaction
   */
  setupSatisfactionTendanceChart() {
    const satisfactionData = [4.1, 4.0, 4.3, 4.2, 4.4, 4.1, 4.2];

    const options = {
      series: [{
        name: 'Satisfaction',
        data: satisfactionData
      }],
      chart: {
        type: 'line',
        height: 350
      },
      colors: ['#28a745'],
      xaxis: {
        categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
      },
      title: {
        text: 'Évolution Satisfaction Client',
        style: {color: '#343473'}
      },
      yaxis: {
        min: 0,
        max: 5
      },
      stroke: {
        curve: 'smooth'
      }
    };

    this.charts.satisfactionTendance = new ApexCharts(document.querySelector("#satisfactionTendanceChart"), options);
    this.charts.satisfactionTendance.render();
  }

  /**
   * Affichage des détails d'un ticket
   */
  showTicketDetails(ticketId) {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const ticket = supportData.tickets.find(t => t.id === ticketId);

    if (!ticket) return;

    this.currentTicket = ticket;
    const modal = new bootstrap.Modal(document.getElementById('ticketDetailsModal'));
    const content = document.getElementById('ticketDetailsContent');

    const slaStatus = this.getSLAStatus(ticket);
    const formattedDate = new Date(ticket.dateCreation).toLocaleString('fr-FR');

    content.innerHTML = `
            <div class="ticket-details-content">
                <div class="row mb-4">
                    <div class="col-md-8">
                        <div class="ticket-header">
                            <h5 class="ticket-title">${ticket.sujet}</h5>
                            <div class="ticket-meta">
                                <span class="badge bg-${this.getPriorityClass(ticket.priorite)} me-2">${ticket.priorite}</span>
                                <span class="badge bg-${this.getStatusClass(ticket.statut)} me-2">${this.getStatusLabel(ticket.statut)}</span>
                                <span class="badge bg-secondary">${ticket.categorie.replace('_', ' ')}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 text-end">
                        <div class="ticket-info">
                            <strong>Ticket #${ticket.numero}</strong><br>
                            <small class="text-muted">Créé le ${formattedDate}</small>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="info-section">
                            <h6 class="section-title">Entreprise & Demandeur</h6>
                            <table class="table table-sm">
                                <tr><td><strong>Entreprise:</strong></td><td>${ticket.entrepriseName}</td></tr>
                                <tr><td><strong>Demandeur:</strong></td><td>${ticket.demandeur.nom}</td></tr>
                                <tr><td><strong>Email:</strong></td><td>${ticket.demandeur.email}</td></tr>
                                <tr><td><strong>Téléphone:</strong></td><td>${ticket.demandeur.telephone}</td></tr>
                                <tr><td><strong>Fonction:</strong></td><td>${ticket.demandeur.fonction}</td></tr>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="info-section">
                            <h6 class="section-title">Support & SLA</h6>
                            <table class="table table-sm">
                                <tr><td><strong>Assigné à:</strong></td><td>${ticket.assigneNom || 'Non assigné'}</td></tr>
                                <tr><td><strong>Niveau:</strong></td><td>Support Niveau ${ticket.niveauSupport}</td></tr>
                                <tr><td><strong>Service:</strong></td><td>${ticket.serviceResponsable}</td></tr>
                                <tr><td><strong>SLA Status:</strong></td><td><span class="badge bg-${slaStatus.class}">${slaStatus.label}</span></td></tr>
                                <tr><td><strong>Échéance:</strong></td><td>${new Date(ticket.sla.dateEcheanceResolution).toLocaleString('fr-FR')}</td></tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="info-section mb-4">
                    <h6 class="section-title">Description</h6>
                    <div class="description-content">
                        <p>${ticket.description}</p>
                    </div>
                </div>

                ${ticket.tags?.length ? `
                    <div class="info-section mb-4">
                        <h6 class="section-title">Tags</h6>
                        <div class="tags-container">
                            ${ticket.tags.map(tag => `<span class="badge bg-light text-dark me-2">${tag}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                <div class="info-section mb-4">
                    <h6 class="section-title">Historique des Actions</h6>
                    <div class="timeline">
                        ${ticket.historique.map(event => `
                            <div class="timeline-item">
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <div class="timeline-header">
                                        <strong>${event.action.replace('_', ' ')}</strong>
                                        <small class="text-muted">${new Date(event.timestamp).toLocaleString('fr-FR')}</small>
                                    </div>
                                    <div class="timeline-body">
                                        ${event.details}
                                        <br><small class="text-muted">Par: ${event.auteur}</small>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                ${ticket.resolutionNote ? `
                    <div class="info-section mb-4">
                        <h6 class="section-title">Note de Résolution</h6>
                        <div class="alert alert-success">
                            <i class="fas fa-check-circle me-2"></i>
                            ${ticket.resolutionNote}
                        </div>
                    </div>
                ` : ''}

                ${ticket.satisfactionClient ? `
                    <div class="info-section">
                        <h6 class="section-title">Satisfaction Client</h6>
                        <div class="satisfaction-rating">
                            ${this.generateStarRating(ticket.satisfactionClient)}
                            <span class="ms-2">${ticket.satisfactionClient}/5</span>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

    modal.show();
  }

  /**
   * Création d'un nouveau ticket
   */
  showNewTicketModal() {
    const modal = new bootstrap.Modal(document.getElementById('nouveauTicketModal'));
    this.resetNewTicketForm();
    modal.show();
  }

  createNewTicket() {
    const form = document.getElementById('nouveauTicketForm');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const newTicketNumber = `2025-${String(supportData.tickets.length + 1).padStart(4, '0')}`;

    const newTicket = {
      id: `TKT_${Date.now()}`,
      numero: newTicketNumber,
      dateCreation: new Date().toISOString(),
      dateModification: new Date().toISOString(),
      dateFermeture: null,
      statut: "NOUVEAU",
      priorite: document.getElementById('ticketPriorite').value,
      categorie: document.getElementById('ticketCategorie').value,
      sousCategorie: document.getElementById('ticketSousCategorie').value,
      sujet: document.getElementById('ticketSujet').value,
      description: document.getElementById('ticketDescription').value,

      entrepriseId: document.getElementById('ticketEntreprise').value,
      entrepriseName: document.getElementById('ticketEntreprise').selectedOptions[0].text,

      demandeur: {
        nom: document.getElementById('demandeurNom').value || 'Non spécifié',
        email: document.getElementById('demandeurEmail').value || '',
        telephone: document.getElementById('demandeurTel').value || '',
        fonction: 'Non spécifié'
      },

      assigneA: null,
      assigneNom: null,
      niveauSupport: 1,
      serviceResponsable: "Support Général",

      sla: this.calculateSLA(document.getElementById('ticketPriorite').value),

      messages: [],
      historique: [{
        timestamp: new Date().toISOString(),
        action: "CREATION",
        auteur: document.getElementById('user-role').textContent,
        details: "Ticket créé via interface support"
      }],

      tags: [],
      resolutionNote: null,
      satisfactionClient: null,
      estimationResolution: null
    };

    supportData.tickets.unshift(newTicket);
    localStorage.setItem('supportData', JSON.stringify(supportData));

    // Fermer la modal et actualiser
    bootstrap.Modal.getInstance(document.getElementById('nouveauTicketModal')).hide();
    this.loadData();
    this.showNotification(`Ticket #${newTicketNumber} créé avec succès`, 'success');
  }

  /**
   * Calcul du SLA
   */
  calculateSLA(priorite) {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const slaConfig = supportData.configuration.sla[priorite];
    const now = new Date();

    const echeanceReponse = new Date(now.getTime() + slaConfig.reponse * 60 * 60 * 1000);
    const echeanceResolution = new Date(now.getTime() + slaConfig.resolution * 60 * 60 * 1000);

    return {
      delaiReponse: slaConfig.reponse,
      delaiResolution: slaConfig.resolution,
      dateEcheanceReponse: echeanceReponse.toISOString(),
      dateEcheanceResolution: echeanceResolution.toISOString(),
      respecteReponse: true,
      respecteResolution: true,
      tempsEcouleReponse: 0,
      tempsEcouleResolution: 0
    };
  }

  /**
   * Communication avec le client
   */
  openCommunication(ticketId) {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const ticket = supportData.tickets.find(t => t.id === ticketId);

    if (!ticket) return;

    const modal = new bootstrap.Modal(document.getElementById('communicationModal'));
    document.getElementById('commTicketId').textContent = ticket.numero;

    this.loadCommunicationThread(ticket);
    modal.show();
  }

  loadCommunicationThread(ticket) {
    const container = document.getElementById('communicationThread');
    container.innerHTML = '';

    ticket.messages.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.className = `message-item ${message.type.toLowerCase()}`;

      const formattedDate = new Date(message.timestamp).toLocaleString('fr-FR');

      messageElement.innerHTML = `
                <div class="message-header">
                    <div class="message-author">
                        <i class="fas fa-${message.type === 'CLIENT' ? 'user' : 'headset'} me-2"></i>
                        <strong>${message.auteur}</strong>
                        <span class="badge bg-${message.type === 'CLIENT' ? 'primary' : 'success'} ms-2">${message.type}</span>
                    </div>
                    <div class="message-time">
                        <small class="text-muted">${formattedDate}</small>
                    </div>
                </div>
                <div class="message-content">
                    <p>${message.contenu}</p>
                    ${message.pieceJointes?.length ? `
                        <div class="message-attachments">
                            <i class="fas fa-paperclip me-2"></i>
                            ${message.pieceJointes.map(file => `<span class="attachment-item">${file}</span>`).join(', ')}
                        </div>
                    ` : ''}
                </div>
                <div class="message-footer">
                    <small class="text-muted">
                        <i class="fas fa-${message.visibleClient ? 'eye' : 'eye-slash'} me-1"></i>
                        ${message.visibleClient ? 'Visible par le client' : 'Interne uniquement'}
                    </small>
                </div>
            `;

      container.appendChild(messageElement);
    });

    // Faire défiler vers le bas
    container.scrollTop = container.scrollHeight;
  }

  sendMessage() {
    const ticketId = document.getElementById('commTicketId').textContent;
    const messageContent = document.getElementById('nouveauMessage').value.trim();
    const visibleClient = document.getElementById('messageClient').checked;

    if (!messageContent) {
      alert('Veuillez saisir un message');
      return;
    }

    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const ticket = supportData.tickets.find(t => t.numero === ticketId);

    if (!ticket) return;

    const newMessage = {
      id: `MSG_${Date.now()}`,
      timestamp: new Date().toISOString(),
      auteur: document.getElementById('user-role').textContent,
      type: "SUPPORT",
      contenu: messageContent,
      pieceJointes: [],
      visibleClient: visibleClient
    };

    ticket.messages.push(newMessage);
    ticket.dateModification = new Date().toISOString();

    // Ajouter à l'historique
    ticket.historique.push({
      timestamp: new Date().toISOString(),
      action: "COMMUNICATION",
      auteur: document.getElementById('user-role').textContent,
      details: `Message ${visibleClient ? 'client' : 'interne'} ajouté`
    });

    localStorage.setItem('supportData', JSON.stringify(supportData));

    // Actualiser la communication et vider le formulaire
    this.loadCommunicationThread(ticket);
    document.getElementById('nouveauMessage').value = '';
    document.getElementById('messageClient').checked = false;

    this.showNotification('Message envoyé avec succès', 'success');
  }

  /**
   * Actions sur les tickets
   */
  assignToMe(ticketId) {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const ticket = supportData.tickets.find(t => t.id === ticketId);
    const currentUser = document.getElementById('user-role').textContent;

    if (ticket) {
      ticket.assigneA = 'current_user';
      ticket.assigneNom = currentUser;
      ticket.statut = 'EN_COURS';
      ticket.dateModification = new Date().toISOString();

      // Ajouter à l'historique
      ticket.historique.push({
        timestamp: new Date().toISOString(),
        action: "ASSIGNATION",
        auteur: currentUser,
        details: `Ticket assigné à ${currentUser}`
      });

      localStorage.setItem('supportData', JSON.stringify(supportData));
      this.loadData();
      this.showNotification(`Ticket #${ticket.numero} assigné`, 'success');
    }
  }

  quickResolve(ticketId) {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const ticket = supportData.tickets.find(t => t.id === ticketId);

    if (ticket) {
      const resolution = prompt('Note de résolution:');
      if (resolution) {
        ticket.statut = 'RESOLU';
        ticket.dateFermeture = new Date().toISOString();
        ticket.resolutionNote = resolution;
        ticket.dateModification = new Date().toISOString();

        // Ajouter à l'historique
        ticket.historique.push({
          timestamp: new Date().toISOString(),
          action: "RESOLUTION",
          auteur: document.getElementById('user-role').textContent,
          details: `Ticket résolu: ${resolution}`
        });

        localStorage.setItem('supportData', JSON.stringify(supportData));
        this.loadData();
        this.showNotification(`Ticket #${ticket.numero} résolu`, 'success');
      }
    }
  }

  escaladeTicket(ticketId) {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const ticket = supportData.tickets.find(t => t.id === ticketId);

    if (ticket) {
      const motif = prompt('Motif de l\'escalade:');
      if (motif) {
        ticket.statut = 'ESCALADE';
        ticket.niveauSupport = Math.min(ticket.niveauSupport + 1, 3);
        ticket.assigneA = 'supervisor_001';
        ticket.assigneNom = 'Jean Superviseur';
        ticket.dateModification = new Date().toISOString();

        // Ajouter à l'historique
        ticket.historique.push({
          timestamp: new Date().toISOString(),
          action: "ESCALADE",
          auteur: document.getElementById('user-role').textContent,
          details: `Escalade niveau ${ticket.niveauSupport}: ${motif}`
        });

        localStorage.setItem('supportData', JSON.stringify(supportData));
        this.loadData();
        this.showNotification(`Ticket #${ticket.numero} escaladé`, 'warning');
      }
    }
  }

  /**
   * Export de rapport
   */
  exportRapport() {
    const {jsPDF} = window.jspdf;
    const doc = new jsPDF();

    // En-tête BCI
    doc.setFillColor(52, 52, 115);
    doc.rect(0, 0, 210, 30, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('BANQUE POUR LE COMMERCE ET L\'INDUSTRIE', 20, 15);

    doc.setFontSize(14);
    doc.text('Rapport Support & Tickets', 20, 25);

    // Informations du rapport
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Généré le : ${new Date().toLocaleString('fr-FR')}`, 20, 40);
    doc.text(`Par : ${document.getElementById('user-role').textContent}`, 20, 45);

    // Statistiques
    let yPos = 60;
    doc.setFontSize(12);
    doc.text('STATISTIQUES SUPPORT', 20, yPos);
    yPos += 10;

    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const stats = supportData.statistiques.global;

    doc.setFontSize(10);
    doc.text(`Tickets ouverts : ${stats.ticketsOuverts}`, 20, yPos);
    yPos += 5;
    doc.text(`Tickets en cours : ${stats.ticketsEnCours}`, 20, yPos);
    yPos += 5;
    doc.text(`Tickets résolus 24h : ${stats.ticketsResolus24h}`, 20, yPos);
    yPos += 5;
    doc.text(`Taux respect SLA : ${stats.tauxRespectSLA}%`, 20, yPos);
    yPos += 5;
    doc.text(`Satisfaction moyenne : ${stats.satisfactionMoyenne}/5`, 20, yPos);
    yPos += 15;

    // Tickets récents
    doc.setFontSize(12);
    doc.text('TICKETS RÉCENTS', 20, yPos);
    yPos += 10;

    const recentTickets = supportData.tickets.slice(0, 10);
    recentTickets.forEach(ticket => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(9);
      const date = new Date(ticket.dateCreation).toLocaleDateString('fr-FR');
      doc.text(`#${ticket.numero} - ${ticket.priorite} - ${ticket.sujet} (${date})`, 20, yPos);
      yPos += 5;
    });

    doc.save('rapport-support-bci.pdf');
    this.showNotification('Rapport exporté avec succès', 'success');
  }

  /**
   * Utilitaires
   */
  getPriorityClass(priority) {
    const classes = {
      'CRITIQUE': 'danger',
      'HAUTE': 'warning',
      'NORMALE': 'primary',
      'BASSE': 'success'
    };
    return classes[priority] || 'secondary';
  }

  getStatusClass(status) {
    const classes = {
      'NOUVEAU': 'primary',
      'EN_COURS': 'warning',
      'ATTENTE_CLIENT': 'info',
      'RESOLU': 'success',
      'FERME': 'secondary',
      'ESCALADE': 'danger'
    };
    return classes[status] || 'secondary';
  }

  getStatusLabel(status) {
    const labels = {
      'NOUVEAU': 'Nouveau',
      'EN_COURS': 'En cours',
      'ATTENTE_CLIENT': 'Attente client',
      'RESOLU': 'Résolu',
      'FERME': 'Fermé',
      'ESCALADE': 'Escaladé'
    };
    return labels[status] || status;
  }

  getSLAStatus(ticket) {
    const now = new Date();
    const echeance = new Date(ticket.sla.dateEcheanceResolution);
    const minutesRestantes = Math.floor((echeance - now) / (1000 * 60));

    if (minutesRestantes < 0) {
      return {
        class: 'text-danger',
        icon: 'exclamation-triangle',
        label: 'En retard',
        details: `${Math.abs(Math.floor(minutesRestantes / 60))}h de retard`
      };
    } else if (minutesRestantes < 60) {
      return {
        class: 'text-warning',
        icon: 'clock',
        label: 'Urgent',
        details: `${minutesRestantes}min restantes`
      };
    } else {
      const heuresRestantes = Math.floor(minutesRestantes / 60);
      return {
        class: 'text-success',
        icon: 'check-circle',
        label: 'Dans les temps',
        details: `${heuresRestantes}h restantes`
      };
    }
  }

  getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));

    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes}min`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays}j`;
  }

  generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<i class="fas fa-star text-warning"></i>';
      } else {
        stars += '<i class="far fa-star text-muted"></i>';
      }
    }
    return stars;
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible notification-toast`;
    notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.insertBefore(notification, document.body.firstChild);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  getNotificationIcon(type) {
    const icons = {
      'success': 'check-circle',
      'error': 'exclamation-triangle',
      'warning': 'exclamation-circle',
      'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
  }

  countTicketsByPriority(priority) {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    return supportData.tickets.filter(t =>
      t.priorite === priority &&
      (t.statut === 'NOUVEAU' || t.statut === 'EN_COURS')
    ).length;
  }

  countMyTickets() {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const currentUser = document.getElementById('user-role').textContent;
    return supportData.tickets.filter(t =>
      t.assigneNom === currentUser &&
      (t.statut === 'NOUVEAU' || t.statut === 'EN_COURS')
    ).length;
  }

  updateTicketsCount() {
    document.getElementById('ticketsCount').textContent = this.filteredTickets.length;
  }

  updatePagination() {
    const totalPages = Math.ceil(this.filteredTickets.length / this.itemsPerPage);
    const pagination = document.getElementById('ticketsPagination');
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    // Bouton précédent
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${this.currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" onclick="supportManager.changePage(${this.currentPage - 1})">Précédent</a>`;
    pagination.appendChild(prevLi);

    // Pages
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.className = `page-item ${i === this.currentPage ? 'active' : ''}`;
      li.innerHTML = `<a class="page-link" href="#" onclick="supportManager.changePage(${i})">${i}</a>`;
      pagination.appendChild(li);
    }

    // Bouton suivant
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${this.currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" onclick="supportManager.changePage(${this.currentPage + 1})">Suivant</a>`;
    pagination.appendChild(nextLi);
  }

  changePage(page) {
    const totalPages = Math.ceil(this.filteredTickets.length / this.itemsPerPage);
    if (page < 1 || page > totalPages) return;

    this.currentPage = page;
    this.displayTickets(this.filteredTickets);
  }

  resetFilters() {
    document.getElementById('searchTickets').value = '';
    document.getElementById('filterStatut').value = '';
    document.getElementById('filterPriorite').value = '';
    document.getElementById('filterCategorie').value = '';
    document.getElementById('filterAgent').value = '';
    this.filterTickets();
  }

  resetNewTicketForm() {
    document.getElementById('nouveauTicketForm').reset();
    document.getElementById('ticketSousCategorie').innerHTML = '<option value="">Sélectionner une sous-catégorie</option>';
  }

  updateSousCategories() {
    const supportData = JSON.parse(localStorage.getItem('supportData'));
    const selectedCategory = document.getElementById('ticketCategorie').value;
    const sousCategSelect = document.getElementById('ticketSousCategorie');

    sousCategSelect.innerHTML = '<option value="">Sélectionner une sous-catégorie</option>';

    if (selectedCategory) {
      const category = supportData.configuration.categories.find(c => c.id === selectedCategory);
      if (category) {
        category.sousCategories.forEach(sousCateg => {
          const option = document.createElement('option');
          option.value = sousCateg;
          option.textContent = sousCateg.replace('_', ' ');
          sousCategSelect.appendChild(option);
        });
      }
    }
  }

  loadEntreprisesList() {
    // Charger la liste des entreprises pour le formulaire de création
    const entreprises = [
      {id: 'ENT_001', nom: 'Tech Solutions SARL'},
      {id: 'ENT_002', nom: 'Commerce Plus Ltd'},
      {id: 'ENT_003', nom: 'Import Export SA'}
    ];

    const select = document.getElementById('ticketEntreprise');
    entreprises.forEach(entreprise => {
      const option = document.createElement('option');
      option.value = entreprise.id;
      option.textContent = entreprise.nom;
      select.appendChild(option);
    });
  }

  startAutoRefresh() {
    // Auto-refresh toutes les 5 minutes
    setInterval(() => {
      this.updateDashboard();
    }, 5 * 60 * 1000);
  }

  refreshData() {
    const btn = document.getElementById('refreshTickets');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    setTimeout(() => {
      this.loadData();
      btn.innerHTML = '<i class="fas fa-sync-alt"></i>';
      btn.disabled = false;
      this.showNotification('Données actualisées', 'success');
    }, 1000);
  }

  handleTabChange(event) {
    const targetId = event.target.getAttribute('href').substring(1);

    if (targetId === 'tableauBord') {
      setTimeout(() => this.setupCharts(), 100);
    }
  }

  // Placeholder methods pour les fonctionnalités avancées
  selectAllTickets() { /* TODO */
  }

  toggleSelectAll() { /* TODO */
  }

  assigneToMe() { /* TODO */
  }

  resolveMultiple() { /* TODO */
  }

  escaladeMultiple() { /* TODO */
  }

  baseConnaissance() { /* TODO */
  }

  notificationClient() { /* TODO */
  }

  showTicketsEnRetard() { /* TODO */
  }

  generateSLAReport() { /* TODO */
  }

  saveConfiguration() { /* TODO */
  }

  escaladeCurrentTicket() { /* TODO */
  }

  assignCurrentTicket() { /* TODO */
  }

  resolveCurrentTicket() { /* TODO */
  }

  duplicateTicket() { /* TODO */
  }
}

// Initialisation
let supportManager;
document.addEventListener('DOMContentLoaded', function () {
  supportManager = new SupportManager();
});
