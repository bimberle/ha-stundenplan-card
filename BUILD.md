# Build-Anweisungen

Da Node.js nicht auf diesem System verfügbar ist, hier die Schritte zum Bauen der Card:

## Voraussetzungen installieren

1. Installieren Sie Node.js von https://nodejs.org/ (Version 16 oder höher empfohlen)
2. Stellen Sie sicher, dass npm verfügbar ist (`npm --version`)

## Build-Prozess

```bash
# Navigieren Sie zum Projektverzeichnis
cd /Users/michi/Nextcloud/dev/ha-stundenplan

# Dependencies installieren
npm install

# Card für Production bauen
npm run build

# Für Entwicklung mit Hot-Reload
npm run dev
```

## Nach dem Build

Die fertige Card wird als `dist/ha-stundenplan-card.js` erstellt und kann in Home Assistant verwendet werden.

## Installation in Home Assistant

1. Kopieren Sie `dist/ha-stundenplan-card.js` nach `config/www/` in Ihrer Home Assistant Installation
2. Fügen Sie zu Ihrer Lovelace-Konfiguration hinzu:

```yaml
resources:
  - url: /local/ha-stundenplan-card.js
    type: module
```

3. Verwenden Sie die Card in Ihrem Dashboard:

```yaml
type: custom:ha-stundenplan-card
server: "https://ihr-stundenplan-server.de"
username: "ihr-benutzername"
password: "ihr-passwort"
height: 400
```