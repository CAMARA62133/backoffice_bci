// Initialize charts
document.addEventListener('DOMContentLoaded', function () {
    initializeCharts();
    startRealTimeUpdates();
});

function initializeCharts() {
    // Volume Chart (24h)
    const volumeOptions = {
        series: [{
            name: 'Opérations',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 111, 90, 87, 105, 123, 145, 160, 155, 143, 135, 120, 110, 95, 80, 65]
        }],
        chart: {
            height: 300,
            type: 'area',
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            }
        },
        colors: ['#3182ce'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3
            }
        },
        xaxis: {
            categories: ['00h', '01h', '02h', '03h', '04h', '05h', '06h', '07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val + " ops";
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " opérations"
                }
            }
        }
    };

    const volumeChart = new ApexCharts(document.querySelector("#volumeChart"), volumeOptions);
    volumeChart.render();

    // Incidents Chart
    const incidentsOptions = {
        series: [4, 3, 3, 2],
        chart: {
            height: 250,
            type: 'donut',
        },
        labels: ['Blocages', 'KYC', 'Accès', 'Autres'],
        colors: ['#e53e3e', '#d69e2e', '#343473', '#3182ce'],
        legend: {
            position: 'right',
            fontSize: '15px'
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%'
                }
            }
        }
    };

    const incidentsChart = new ApexCharts(document.querySelector("#incidentsChart"), incidentsOptions);
    incidentsChart.render();

    // Heatmap Chart
    const heatmapOptions = {
        series: [{
            name: 'Lun',
            data: generateHeatmapData()
        }, {
            name: 'Mar',
            data: generateHeatmapData()
        }, {
            name: 'Mer',
            data: generateHeatmapData()
        }, {
            name: 'Jeu',
            data: generateHeatmapData()
        }, {
            name: 'Ven',
            data: generateHeatmapData()
        }],
        chart: {
            height: 250,
            type: 'heatmap',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#3182ce"],
        xaxis: {
            categories: ['08h', '10h', '12h', '14h', '16h', '18h'],
            labels: {
                style: {
                    fontSize: '15px'
                }
            }
        }
    };

    const heatmapChart = new ApexCharts(document.querySelector("#heatmapChart"), heatmapOptions);
    heatmapChart.render();
}

function generateHeatmapData() {
    const data = [];
    for (let i = 0; i < 6; i++) {
        data.push(Math.floor(Math.random() * 90) + 10);
    }
    return data;
}

// Real-time updates simulation
function startRealTimeUpdates() {
    setInterval(() => {
        // Update random KPI
        const kpis = document.querySelectorAll('.kpi-value');
        const randomKpi = kpis[Math.floor(Math.random() * kpis.length)];

        // Simulate small changes
        if (randomKpi.textContent.includes(',')) {
            const value = parseFloat(randomKpi.textContent.replace(',', '.'));
            randomKpi.textContent = (value + (Math.random() - 0.5) * 0.1).toFixed(2).replace('.', ',');
        }
    }, 5000);
}

// Modal functions
function showCreateTicketModal() {
    const modal = new bootstrap.Modal(document.getElementById('createTicketModal'));
    modal.show();
}

function showUnblockModal(id) {
    const modal = new bootstrap.Modal(document.getElementById('unblockModal'));
    modal.show();
}

function submitTicket() {
    // Simulate ticket creation
    alert('Ticket créé avec succès !');
    bootstrap.Modal.getInstance(document.getElementById('createTicketModal')).hide();

    // Update notification count
    const notifCount = document.querySelector('.notification-count');
    notifCount.textContent = parseInt(notifCount.textContent) + 1;
}

function confirmUnblock() {
    alert('Blocage levé avec succès. L\'action a été enregistrée.');
    bootstrap.Modal.getInstance(document.getElementById('unblockModal')).hide();
}

function validateOperation(id) {
    if (confirm('Valider cette opération ?')) {
        alert('Opération validée avec succès !');
    }
}

function showDetails(id) {
    alert('Redirection vers les détails de l\'opération #' + id);
}

function showLogs(id) {
    alert('Affichage des logs pour l\'opération #' + id);
}

function handleTicket(ticketId) {
    alert('Redirection vers le traitement du ticket ' + ticketId);
}

function viewTicket(ticketId) {
    alert('Affichage du ticket ' + ticketId);
}

function generateReport() {
    alert('Génération du rapport en cours...');
    setTimeout(() => {
        alert('Rapport PDF généré et téléchargé !');
    }, 2000);
}

function exportTransactions() {
    alert('Export des transactions en cours...');
    setTimeout(() => {
        alert('Fichier CSV exporté avec succès !');
    }, 1500);
}

function showPendingValidations() {
    alert('Redirection vers la page des opérations en attente de validation');
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function toggleNotifications() {
    alert('Affichage du panneau de notifications');
}

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + K for quick search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        alert('Recherche rapide activée');
    }

    // Ctrl/Cmd + N for new ticket
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        showCreateTicketModal();
    }
});

// Auto-refresh toggle
let autoRefresh = true;
let refreshInterval;

function toggleAutoRefresh() {
    autoRefresh = !autoRefresh;
    if (autoRefresh) {
        refreshInterval = setInterval(() => {
            console.log('Données actualisées');
        }, 30000);
    } else {
        clearInterval(refreshInterval);
    }
}