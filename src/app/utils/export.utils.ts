import * as jspdf from 'jspdf';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Fonction pour exporter un tableau au format CSV
 * @param data  Consiste le tableau a exporter
 * @param filename Consiste le nom du fichier lors de l'exportation
 */
export function exportToCSV(data: any[], filename: string = "exportation.csv") {
  // Si le tableau a exporter n'existe pas ou est vide
  if (!data || data.length === 0) {
    alert("Aucune donnée à exporter");
    console.error("Aucune donnée à exporter");
    return;
  }

  // Separateur par default ","
  const separator = ',';

  // Noms des colonnes
  const keys = Object.keys(data[0]);

  // Contenue du fichier
  const csvContent =
    keys.join(separator) + '\n' + data.map(
      row => keys.map(k => {
        let cell = row[k] ?? '';
        cell = cell.toString().replace(/"/g, '""');
        return `"${cell}"`;
      }).join(separator)
    ).join('\n');

  // Byte Order Mark pour le support UTF-8 dans Excel
  const BOM = '\ufeff';

  const blob = new Blob([BOM + csvContent], {
    type: 'text/csv;charset=utf-8;'
  });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = generateNameNumber(filename);
  link.click();

  console.log("Export To CSV : ", data);
}


/**
 * Fonction pour exporter un tableau au format PDF
 * @param data  Consiste le tableau a exporter
 * @param filename Consiste le nom du fichier lors de l'exportation
 */
export function exportToPDF(data: any[], filename: string = "exportation.pdf") {
  // Si le tableau a exporter n'existe pas ou est vide
  if (!data || data.length === 0) {
    alert("Aucune donnée à exporter");
    console.error("Aucune donnée à exporter");
    return;
  }

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  });

  // ------------- Colonnes fixes (posées en dur) --------------
  const columns = [
    "ID",
    "Date",
    "Nom utilisateur",
    "Login utilisateur",
    "Statut",
    "État",
    "IP",
    "Navigateur",
    "Application",
    "Source",
    "Message",
  ];

  // ------------- Formatage des lignes -------------------------
  const rows = data.map((log, index) => [
    index + 1,
    log.dtDate ? new Date(log.dtDate).toLocaleString("fr-FR") : "",
    log.FullName || "Nom inconnu",
    log.vcUserName || "Login inconnu",
    (+log.btEnabled === 1 ? "Actif" : "Inactif"),
    (+log.btBlocked === 1 ? "Bloqué" : "Non bloqué"),
    log.vcIP,
    log.vcBrowser,
    log.vcApplicationName,
    log.vcSource,
    log.vcMessage
  ])

  // ------------- AutoTable avec largeurs optimisées ----------
  autoTable(doc, {
    head: [columns],
    body: rows,

    startY: 40,
    margin: {top: 40, left: 20, right: 20},

    styles: {
      fontSize: 9,
      cellPadding: 5,
      overflow: 'linebreak',
      lineColor: [0, 0, 0],      // Couleur des bordures
      lineWidth: 0.3,
    },

    headStyles: {
      fillColor: [54, 42, 122],
      textColor: 255,
      fontSize: 10,
      halign: 'center',
      lineColor: [0, 0, 0],      // Bordure header
      lineWidth: 0.3,
    },

    // ⭐ Réglage parfait des largeurs pour ton tableau
    columnStyles: {
      0: {cellWidth: 40},   // ID
      1: {cellWidth: 60},   // Date
      2: {cellWidth: 70},  // Nom utilisateur
      3: {cellWidth: 70},  // Login utilisateur
      4: {cellWidth: 50},   // Statut
      5: {cellWidth: 50},   // État
      6: {cellWidth: 70},   // IP
      7: {cellWidth: 110},  // Navigateur
      8: {cellWidth: 80},  // Application
      9: {cellWidth: 90},  // Source
      10: {cellWidth: 100},  // Message (long)
    },

    tableWidth: 'auto',
    pageBreak: 'auto',

    // Affiche les bordures de toutes les cellules
    didParseCell: function (data) {
      data.cell.styles.lineWidth = 0.3;
      data.cell.styles.lineColor = [0, 0, 0]; // noir
    }
  });


  // Sauvegard du fichier avec le nom
  doc.save(generateNameNumber(filename));
  console.log("Export ToPDF : ", data);
}

/**
 * Fonction pour exporter un tableau au format PDF
 * @param data  Consiste le tableau a exporter
 * @param filename Consiste le nom du fichier lors de l'exportation
 */
export function exportOrgLogToPDF(data: any[], filename: string = "exportation.pdf") {
  // Si le tableau a exporter n'existe pas ou est vide
  if (!data || data.length === 0) {
    alert("Aucune donnée à exporter");
    console.error("Aucune donnée à exporter");
    return;
  }

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  });

  // ------------- Colonnes fixes (posées en dur) --------------
  const columns = [
    "ID",
    "Date",
    "Organisation",
    "Nom utilisateur",
    "Login utilisateur",
    "Statut",
    "État",
    "IP",
    "Navigateur",
    "Application",
    "Source",
    "Message"
  ];

  // ------------- Formatage des lignes -------------------------
  const rows = data.map((log, index) => [
    index + 1,
    log.dtDate ? new Date(log.dtDate).toLocaleString("fr-FR") : "",
    log.Organisation || "",
    log.FullName || "Nom inconnu",
    log.vcUserName || "Login inconnu",
    (+log.btEnabled === 1 ? "Actif" : "Inactif"),
    (+log.btBlocked === 1 ? "Bloqué" : "Non bloqué"),
    log.vcIP,
    log.vcBrowser,
    log.vcApplicationName,
    log.vcSource,
    log.vcMessage
  ])

  // ------------- AutoTable avec largeurs optimisées ----------
  autoTable(doc, {
    head: [columns],
    body: rows,

    startY: 40,
    margin: {top: 40, left: 20, right: 20},

    styles: {
      fontSize: 9,
      cellPadding: 5,
      overflow: 'linebreak',
      lineColor: [0, 0, 0],      // Couleur des bordures
      lineWidth: 0.3,
    },

    headStyles: {
      fillColor: [54, 42, 122],
      textColor: 255,
      fontSize: 10,
      halign: 'center',
      lineColor: [0, 0, 0],      // Bordure header
      lineWidth: 0.3,
    },

    // ⭐ Réglage parfait des largeurs pour ton tableau
    columnStyles: {
      0: {cellWidth: 40},   // ID
      1: {cellWidth: 60},   // Date
      2: {cellWidth: 70},  // Organisation
      3: {cellWidth: 70},  // Nom utilisateur
      4: {cellWidth: 70},  // Login utilisateur
      5: {cellWidth: 50},   // Statut
      6: {cellWidth: 50},   // État
      7: {cellWidth: 60},   // IP
      8: {cellWidth: 100},  // Navigateur
      9: {cellWidth: 70},  // Application
      10: {cellWidth: 70},  // Source
      11: {cellWidth: 90},  // Message (long)
    },

    tableWidth: 'auto',
    pageBreak: 'auto',

    // Affiche les bordures de toutes les cellules
    didParseCell: function (data) {
      data.cell.styles.lineWidth = 0.3;
      data.cell.styles.lineColor = [0, 0, 0]; // noir
    }
  });


  // Sauvegard du fichier avec le nom
  doc.save(generateNameNumber(filename));
  console.log("Export ToPDF : ", data);
}


/**
 * Ajouer un numero automatique au nom du fichier,
 * Elle prends le nom du fichier en params,
 * Elle separe le nom du fichier de son extension,
 * Genere un numero auto,
 * Faire la concatenantion et retourner le nouveau nom,
 * @param fileName est le nom du ficier
 */
function generateNameNumber(fileName: string): string {
  if (!fileName || fileName.length === 0) {
    alert("Nom du fichier invalide !");
    console.log("Nom du fichier invalide !")
    // return false;
  }

  const timestamp = new Date().getTime();
  const fileParts = fileName.split('.');
  const name = fileParts[0];
  const ext = fileParts[1] || 'pdf';

  return `${name}_${timestamp}.${ext}`;
}


/**
 * Fonction pour exporter un tableau au format PDF
 * @param data  Consiste le tableau a exporter
 * @param filename Consiste le nom du fichier lors de l'exportation
 */
export function exportToPDF2(data: any[], filename: string = "exportation.pdf") {
  // Si le tableau a exporter n'existe pas ou est vide
  if (!data || data.length === 0) {
    alert("Aucune donnée à exporter");
    console.error("Aucune donnée à exporter");
    return;
  }
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  });

  const columns = Object.keys(data[0]);
  const rows = data.map(obj => Object.values(obj) as any[]);

  autoTable(doc, {
    head: [columns],
    body: rows,

    startY: 40,
    margin: {top: 40, left: 20, right: 20},

    styles: {
      fontSize: 9,
      cellPadding: 6,
      overflow: 'linebreak', // 👈 ici c'est correct
    },

    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontSize: 10,
    },

    // 🔥 Largeur complète + colonnes larges
    tableWidth: 'auto',

    columnStyles: (() => {
      let colStyles: { [key: number]: any } = {}; // 👈 correction TS
      columns.forEach((col, index) => {
        colStyles[index] = {cellWidth: 120}; // augmenter si nécessaire
      });
      return colStyles;
    })(),
  });

  doc.save(filename);
  console.log("Export ToPDF : ", data, " docName: ", filename);
}
