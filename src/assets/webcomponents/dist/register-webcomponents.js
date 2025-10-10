// src/assets/webcomponents/register-webcomponents.js

// Import du CSS
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./assets/webcomponents/alert_notification.css";
document.head.appendChild(link);

// Chargement dynamique du module
const script = document.createElement("script");
script.src = "./assets/webcomponents/dist/alerte-notification-components.es.js";
script.onload = () => {
  console.log("React Web Components loaded successfully");
};
script.onerror = (error) => {
  console.error("Failed to load React Web Components:", error);
};
document.head.appendChild(script);
