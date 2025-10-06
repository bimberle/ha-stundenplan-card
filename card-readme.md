# Stundenplan Card

![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)
![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2021.3+-blue.svg)

Eine konfigurierbare Lovelace Card zur Anzeige von Stundenplan-Daten in Home Assistant.

## Installation

### HACS (Home Assistant Community Store)
1. Öffnen Sie HACS in Home Assistant
2. Gehen Sie zu "Frontend" 
3. Klicken Sie auf das Menü (⋮) und wählen Sie "Custom repositories"
4. Fügen Sie diese Repository-URL hinzu: `https://github.com/bimberle/ha-stundenplan-card`
5. Wählen Sie "Lovelace" als Kategorie
6. Installieren Sie die Card über HACS
7. Starten Sie Home Assistant neu

## Konfiguration

```yaml
type: custom:ha-stundenplan-card
server: "https://ihr-stundenplan-server.de"
username: "ihr-benutzername"
password: "ihr-passwort"
height: 400
```

## Unterstützte Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|-----|--------------|----------|--------------|
| `server` | string | ✅ | - | URL des Stundenplan-Servers |
| `username` | string | ✅ | - | Benutzername für Authentifizierung |
| `password` | string | ✅ | - | Passwort für Authentifizierung |
| `height` | number | ❌ | 400 | Höhe der Card in Pixeln |