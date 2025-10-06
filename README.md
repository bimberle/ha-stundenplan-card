# Home Assistant Stundenplan Card

Eine konfigurierbare Custom Card für Home Assistant zur Anzeige von Stundenplan-Daten.

## Features

- 🎨 Moderne, responsive Benutzeroberfläche
- ⚙️ Grafischer Konfigurationseditor
- 🔐 Sichere Authentifizierung mit Benutzername/Passwort
- 📏 Einstellbare Kartenhöhe
- 🔄 Automatisches Laden der Daten
- 💥 Fehlerbehandlung mit aussagekräftigen Meldungen

## Konfiguration

Die Card unterstützt folgende Konfigurationsparameter:

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|-----|--------------|----------|--------------|
| `server` | string | Ja | - | URL des Stundenplan-Servers |
| `username` | string | Ja | - | Benutzername für die Anmeldung |
| `password` | string | Ja | - | Passwort für die Anmeldung |
| `height` | number | Nein | 400 | Höhe der Card in Pixel |

### Beispiel-Konfiguration

```yaml
type: custom:ha-stundenplan-card
server: "https://stundenplan.example.com"
username: "mein-benutzer"
password: "mein-passwort"
height: 500
```

## Installation

### HACS (Empfohlen)

1. Öffnen Sie HACS in Home Assistant
2. Gehen Sie zu "Frontend"
3. Klicken Sie auf das Menü (drei Punkte) und wählen Sie "Custom repositories"
4. Fügen Sie diese Repository-URL hinzu: `https://github.com/ihr-benutzer/ha-stundenplan-card`
5. Wählen Sie "Lovelace" als Kategorie
6. Klicken Sie auf "Add"
7. Installieren Sie die Card über HACS
8. Fügen Sie die Ressource zur Lovelace-Konfiguration hinzu

### Manuelle Installation

1. Downloaden Sie die `ha-stundenplan-card.js` aus dem [neuesten Release](https://github.com/ihr-benutzer/ha-stundenplan-card/releases)
2. Kopieren Sie die Datei in das Verzeichnis `config/www/` Ihrer Home Assistant Installation
3. Fügen Sie die Ressource zu Ihrer Lovelace-Konfiguration hinzu:

```yaml
resources:
  - url: /local/ha-stundenplan-card.js
    type: module
```

## Entwicklung

### Voraussetzungen

- Node.js (>= 16.x)
- npm oder yarn

### Setup

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Build für Produktion
npm run build

# Linting
npm run lint
```

### Projektstruktur

```
src/
├── types.ts                 # TypeScript Interfaces
├── stundenplan-card.ts     # Haupt-Card-Komponente
├── editor.ts               # Konfigurations-Editor
└── ha-stundenplan-card.ts  # Einstiegspunkt

dist/
└── ha-stundenplan-card.js  # Gebündelte Ausgabe
```

## API-Integration

Die Card erwartet, dass Ihr Stundenplan-Server einen Endpunkt `/api/stundenplan` bereitstellt, der JSON-Daten im folgenden Format zurückgibt:

```json
[
  {
    "time": "08:00 - 09:30",
    "subject": "Mathematik",
    "room": "A101"
  },
  {
    "time": "09:45 - 11:15",
    "subject": "Deutsch",
    "room": "B203"
  }
]
```

Die Authentifizierung erfolgt über HTTP Basic Auth mit den konfigurierten Benutzerdaten.

## Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## Beitragen

Beiträge sind willkommen! Bitte erstellen Sie einen Pull Request oder öffnen Sie ein Issue für Vorschläge und Bugfixes.